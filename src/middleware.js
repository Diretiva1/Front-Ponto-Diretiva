import { NextResponse } from "next/server";
import { verify, decode } from 'jsonwebtoken';

function verifyToken(token) {
	const milles = 1000;
	if (token) {
		const decodedToken = decode(token.value);
		return !(decodedToken.exp* milles < Date.now());
	}
	return false;
	
}
 
export function middleware(request) {

	const signin = new URL("/signin", request.url);
	const signup = new URL("/signup", request.url);
	
	const token = request.cookies.get("access_token");
	
	if(verifyToken(token)){
		const decodedToken = decode(token.value);
		const rote = new URL('/'+decodedToken.permissions[0], request.url);
		if(request.nextUrl.pathname === "/signin" || request.nextUrl.pathname === "/signup"){
			return NextResponse.redirect(rote);
		}
		if(decodedToken.permissions[0] == "employee"){
			if(request.nextUrl.pathname === "/employer" || request.nextUrl.pathname === "/employer/:path*" || request.nextUrl.pathname === "/"){
				return NextResponse.redirect(new URL("/employee", request.url));
			}
		}
		if(decodedToken.permissions[0] == "employer"){
			if(request.nextUrl.pathname === "/employee" || request.nextUrl.pathname === "/employee/:path*" || request.nextUrl.pathname === "/"){
				return NextResponse.redirect(new URL("/employer", request.url));
			}
		}
	}else{
		if(request.nextUrl.pathname === "/signin" || request.nextUrl.pathname === "/signup"){
			const response = NextResponse.next();
			return response;
		}

		return NextResponse.redirect(signin);

	};
}

export const config = {
	matcher: [
		"/signin",
		"/signup",
		"/employer",
		"/employer/:path*",
		"/employee",
		"/employee/:path*",
	],
};
import { NextRequest, NextResponse } from "next/server"



/**
 * 
 * @param {NextRequest} request 
 * @returns 
 */
export function middleware(request){
    return NextResponse.next()
}
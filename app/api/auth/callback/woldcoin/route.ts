import {
  verifyCloudProof,
  IVerifyResponse,
  ISuccessResult,
} from "@worldcoin/minikit-js";
import { NextRequest, NextResponse } from "next/server";

interface IRequestPayload {
  payload: ISuccessResult;
  action: string;
  signal: string | undefined;
}

export async function POST(req: NextRequest) {
  const { payload, action, signal } = (await req.json()) as IRequestPayload;
  console.log('🚀 ~ POST ~ action:', action)
  console.log('🚀 ~ POST ~ payload:', payload)

    return NextResponse.json({ verifyRes: 'test', status: 200 });

}

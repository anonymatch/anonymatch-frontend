// pages/api/profile.js
import fs from 'fs/promises';
import path from 'path';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const filePath = path.join(process.cwd(), 'public', 'data.json');
      const data = await fs.readFile(filePath, 'utf8');
      const jsonData = JSON.parse(data);
      res.status(200).json(jsonData);
    } catch (error) {
      console.error('Error reading data.json:', error);
      res.status(500).json({ error: 'Error fetching data' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

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
    const app_id = process.env.APP_ID as `app_${string}`;
    const verifyRes = (await verifyCloudProof(
      payload,
      app_id,
      action,
      signal
    )) as IVerifyResponse; // Wrapper on this
    
    console.log(verifyRes);
  
    if (verifyRes.success) {
      // This is where you should perform backend actions if the verification succeeds
      // Such as, setting a user as "verified" in a database
      return NextResponse.json({ verifyRes, status: 200 });
    } else {
      // This is where you should handle errors from the World ID /verify endpoint.
      // Usually these errors are due to a user having already verified.
      return NextResponse.json({ verifyRes, status: 400 });
    }
  }
  
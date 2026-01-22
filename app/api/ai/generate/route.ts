import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(request: NextRequest) {
  try {
    const { prompt, type } = await request.json();

    // 检查 API Key
    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Google API Key not configured' },
        { status: 500 }
      );
    }

    // 初始化 Google Generative AI
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    let systemPrompt = '';

    // 根据任务类型设置不同的系统提示
    switch (type) {
      case 'product_copy':
        systemPrompt = `You are an expert e-commerce copywriter. Generate a catchy Title and a compelling Description based on the user's input. Input: ${prompt}. Output format: JSON { title: string, description: string }. Language: English.`;
        break;
      case 'compliance_check':
        systemPrompt = `You are an e-commerce legal expert. Analyze this product for risks (FDA, Copyright/IP, Safety). Input: ${prompt}. Output format: JSON { score: number (0-100, 100 is safe), report: string (short summary) }.`;
        break;
      default:
        return NextResponse.json(
          { error: 'Invalid task type' },
          { status: 400 }
        );
    }

    // 生成内容
    const result = await model.generateContent(systemPrompt);
    const response = await result.response;
    let text = response.text();

    // 数据清洗：去除可能的 Markdown 格式
    text = text.replace(/^```json\n/, '').replace(/\n```$/, '').trim();

    // 解析 JSON
    const parsedData = JSON.parse(text);

    return NextResponse.json(parsedData);
  } catch (error) {
    console.error('Error generating content:', error);
    return NextResponse.json(
      { error: 'Failed to generate content' },
      { status: 500 }
    );
  }
}

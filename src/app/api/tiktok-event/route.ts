import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { eventName, orderId, email, phone, value, currency, items, pageUrl } = body;

    const pixelCode = 'D92DUN3C77UBI6V95NQG';
    const accessToken = '4eb61baa888a5c95c3b2de5eae0242e4531e37d1';

    // Hash user data if present (TikTok requires SHA-256 for user info)
    let hashedPhone = undefined;
    let hashedEmail = undefined;

    if (phone) {
      hashedPhone = crypto.createHash('sha256').update(phone).digest('hex');
    }
    if (email) {
      hashedEmail = crypto.createHash('sha256').update(email.toLowerCase()).digest('hex');
    }

    // Force the domain to be www.sharraby.com for tracking purposes
    let eventUrl = pageUrl || req.headers.get('referer') || "https://www.sharraby.com/";
    try {
      const urlObj = new URL(eventUrl);
      urlObj.hostname = 'www.sharraby.com';
      eventUrl = urlObj.toString();
    } catch(e) {}

    const payload = {
      pixel_code: pixelCode,
      event: eventName,
      event_id: orderId ? String(orderId) : undefined,
      timestamp: new Date().toISOString(),
      context: {
        document: {
          url: eventUrl,
        },
        user: {
          phone_number: hashedPhone,
          email: hashedEmail,
        },
      },
      properties: {
        contents: items?.map((item: any) => ({
          content_id: item.id,
          content_name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
        value: value,
        currency: currency || "SAR",
      },
    };

    const response = await fetch('https://business-api.tiktok.com/open_api/v1.3/pixel/track/', {
      method: 'POST',
      headers: {
        'Access-Token': accessToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('TikTok Event API Error:', error);
    return NextResponse.json({ success: false, error: 'Failed to send event' }, { status: 500 });
  }
}

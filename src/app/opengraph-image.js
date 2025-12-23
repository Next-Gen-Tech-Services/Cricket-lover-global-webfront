import { ImageResponse } from 'next/og';
import { siteConfig } from './configs/seo.config';

export const runtime = 'edge';
export const alt = siteConfig.name;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: 'linear-gradient(to bottom right, #1e3a8a, #3b82f6)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
        }}
      >
        <div style={{ marginBottom: 20, fontSize: 64 }}>🏏</div>
        <div style={{ fontWeight: 'bold', textAlign: 'center', padding: '0 40px' }}>
          {siteConfig.name}
        </div>
        <div style={{ fontSize: 32, marginTop: 20, textAlign: 'center', padding: '0 60px' }}>
          Your Ultimate Cricket Community
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

'use client';

import { useState } from 'react';

const titleStyle: React.CSSProperties = {
  fontSize: 10,
  color: '#444',
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  cursor: 'pointer',
  userSelect: 'none'
};

const bodyStyle: React.CSSProperties = {
  fontSize: 13,
  color: '#777',
  lineHeight: 1.7,
  paddingTop: 12
};

function Accordion({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ borderTop: '1px solid #1a1a1a', padding: '16px 0' }}>
      <div style={titleStyle} onClick={() => setOpen(!open)}>
        <span>{title}</span>
        <span style={{ fontSize: 16, fontWeight: 300, lineHeight: 1 }}>{open ? '−' : '+'}</span>
      </div>
      {open && (
        <div style={bodyStyle}>
          {children}
        </div>
      )}
    </div>
  );
}

const sizeData = [
  { size: 'S',   chest: '36"', length: '27"', sleeve: '8"'    },
  { size: 'M',   chest: '39"', length: '28"', sleeve: '8.5"'  },
  { size: 'L',   chest: '42"', length: '29"', sleeve: '9"'    },
  { size: 'XL',  chest: '45"', length: '30"', sleeve: '9.5"'  },
  { size: 'XXL', chest: '48"', length: '31"', sleeve: '10"'   },
];

const cellStyle: React.CSSProperties = {
  fontSize: 12,
  color: '#bbb',
  padding: '8px 4px',
  borderBottom: '1px solid #1a1a1a',
  textAlign: 'left'
};

const headStyle: React.CSSProperties = {
  ...cellStyle,
  color: '#444',
  fontSize: 10,
  textTransform: 'uppercase',
  letterSpacing: '0.1em'
};

export function ProductAccordions({ descriptionHtml }: { descriptionHtml?: string }) {
  return (
    <div style={{ marginTop: 24 }}>

      <Accordion title="Size Guide">
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={headStyle}>Size</th>
              <th style={headStyle}>Chest</th>
              <th style={headStyle}>Length</th>
              <th style={headStyle}>Sleeve</th>
            </tr>
          </thead>
          <tbody>
            {sizeData.map((row) => (
              <tr key={row.size}>
                <td style={cellStyle}>{row.size}</td>
                <td style={cellStyle}>{row.chest}</td>
                <td style={cellStyle}>{row.length}</td>
                <td style={cellStyle}>{row.sleeve}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Accordion>

      <Accordion title="Shipping & Delivery">
        <p>UK Standard: 3-5 business days — Free</p>
        <p>UK Express: 1-2 business days — £4.99</p>
        <p>International: 7-14 business days — £9.99</p>
        <p style={{ marginTop: 10 }}>All orders are processed within 1-2 business days.</p>
        <p>Tracking provided on all orders.</p>
      </Accordion>

      <Accordion title="Returns & Exchanges">
        <p>We accept returns within 30 days of delivery.</p>
        <p>Items must be unworn, unwashed, and in original condition. Sale items are final sale.</p>
        <p style={{ marginTop: 10 }}>To start a return email: <span style={{ color: '#A8192E' }}>returns@randamn.com</span></p>
        <p style={{ marginTop: 10 }}>Exchanges subject to stock availability — remember, no restocks. ever.</p>
      </Accordion>

      {descriptionHtml && (
        <Accordion title="Product Details">
          <div dangerouslySetInnerHTML={{ __html: descriptionHtml }} />
        </Accordion>
      )}

    </div>
  );
}

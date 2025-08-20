# QR Code Generator

A modern, responsive QR code generator built with Next.js, React, and TypeScript. Generate QR codes for various types of content including text, URLs, emails, phone numbers, WiFi credentials, and more.

## 🚀 Features

- **Multiple QR Code Types**: Support for 8 different content types:
  - 📝 Plain text
  - 🌐 URLs/Websites
  - 📧 Email (with subject and body)
  - 📞 Phone numbers
  - 💬 SMS messages
  - 📶 WiFi credentials
  - 📍 Geographic locations
  - 👤 vCard contact information

- **Customizable QR Codes**:
  - Adjustable error correction levels (L, M, Q, H)
  - Multiple size options (128px to 512px)
  - High-quality PNG download

- **Real-time Validation**:
  - Input validation for emails, phone numbers, and URLs
  - Live preview of QR code generation
  - Error feedback for invalid inputs

- **Modern UI**:
  - Clean, responsive design
  - Built with shadcn/ui components
  - Tailwind CSS styling
  - Mobile-friendly interface

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) with [Radix UI](https://www.radix-ui.com/)
- **QR Generation**: [qrcode](https://www.npmjs.com/package/qrcode)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Form Handling**: [React Hook Form](https://react-hook-form.com/) with [Zod](https://zod.dev/)

## 📦 Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/ASJordi/qr-generator.git
   cd qr-generator
   ```

2. **Install dependencies**:
   ```bash
   pnpm install
   # or
   npm install
   # or
   yarn install
   ```

3. **Run the development server**:
   ```bash
   pnpm dev
   # or
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser** and navigate to [http://localhost:3000](http://localhost:3000)

## 🚀 Deployment

The application is deployed at: [https://qr.asjordi.dev](https://qr.asjordi.dev)

### Build for Production

```bash
pnpm build
pnpm start
```

## 📖 Usage

1. **Select Content Type**: Choose from the 8 available tabs (Text, URL, Email, Phone, SMS, WiFi, Location, vCard)

2. **Fill in Details**: Enter the required information for your selected content type

3. **Customize Settings**: 
   - Adjust error correction level for better scanning reliability
   - Choose QR code size based on your needs

4. **Generate & Download**: The QR code is generated in real-time. Click the download button to save as PNG

### Content Type Examples

- **Text**: Any plain text content
- **URL**: `https://example.com` or `example.com`
- **Email**: Recipient, subject, and message body
- **Phone**: `+1234567890` or `(123) 456-7890`
- **SMS**: Phone number and pre-filled message
- **WiFi**: Network name, password, and security type
- **Location**: Latitude and longitude coordinates
- **vCard**: Complete contact information

## 🏗️ Project Structure

```
qr-generator/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout component
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── qr-generator.tsx   # Main QR generator component
│   ├── theme-provider.tsx # Theme context provider
│   └── ui/                # shadcn/ui components
├── hooks/                 # Custom React hooks
│   ├── use-qr-generator.ts # QR generation logic
│   └── use-toast.ts       # Toast notifications
├── lib/                   # Utility functions
│   └── utils.ts           # Common utilities
└── public/                # Static assets
    ├── favicon.svg
    └── og-image.png
```

## 🔧 Configuration

The project uses several configuration files:

- `next.config.mjs` - Next.js configuration
- `tailwind.config.ts` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration
- `components.json` - shadcn/ui configuration

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Jordi Ayala**
- Website: [asjordi.dev](https://asjordi.dev)
- Email: dev@asjordi.dev
- GitHub: [@ASJordi](https://github.com/ASJordi)

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Radix UI](https://www.radix-ui.com/) for the accessible primitives
- [Lucide](https://lucide.dev/) for the clean icons
- [qrcode](https://www.npmjs.com/package/qrcode) library for QR code generation

---

<div align="center">
  <p>Made with ❤️ by <a href="https://asjordi.dev">Jordi Ayala</a></p>
</div>

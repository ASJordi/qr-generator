"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Download,
  Smartphone,
  Wifi,
  Mail,
  Phone,
  MessageSquare,
  MapPin,
  CreditCard,
  Globe,
  AlertCircle,
} from "lucide-react"
import { useQRGenerator } from "@/hooks/use-qr-generator"

const ValidationError = ({ error }: { error?: string }) => {
  if (!error) return null
  return (
    <div className="flex items-center gap-1 text-red-600 text-sm mt-1">
      <AlertCircle className="h-3 w-3" />
      {error}
    </div>
  )
}

export default function QRGenerator() {
  const {
    activeTab,
    qrData,
    qrCodeUrl,
    errorLevel,
    size,
    validationErrors,
    canvasRef,
    validationResult,
    qrString,
    setActiveTab,
    setErrorLevel,
    setSize,
    updateQRData,
    updateNestedQRData,
    handlePhoneInput,
    handleNumberInput,
    downloadQRCode,
  } = useQRGenerator()

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-black mb-4">QR Code Generator</h1>
          <p className="text-gray-600 text-lg">Create QR codes for different types of content</p>
        </div>

        <div
          className={`grid gap-8 ${validationResult.isValid ? "lg:grid-cols-2" : "lg:grid-cols-1 max-w-2xl mx-auto"}`}
        >
          {/* Input Section */}
          <Card className="bg-white border border-gray-200 shadow-sm">
            <CardHeader className="border-b border-gray-200">
              <CardTitle className="flex items-center gap-2 text-black">
                <Smartphone className="h-5 w-5 text-gray-600" />
                QR Code Content
              </CardTitle>
              <CardDescription className="text-gray-600">
                Choose the type of content and fill in the details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-8 mb-6 bg-gray-100 border border-gray-200 p-1">
                  <TabsTrigger
                    value="text"
                    className="data-[state=active]:bg-white data-[state=active]:text-black text-gray-600 hover:text-black transition-all duration-200"
                  >
                    <MessageSquare className="h-4 w-4" />
                  </TabsTrigger>
                  <TabsTrigger
                    value="url"
                    className="data-[state=active]:bg-white data-[state=active]:text-black text-gray-600 hover:text-black transition-all duration-200"
                  >
                    <Globe className="h-4 w-4" />
                  </TabsTrigger>
                  <TabsTrigger
                    value="email"
                    className="data-[state=active]:bg-white data-[state=active]:text-black text-gray-600 hover:text-black transition-all duration-200"
                  >
                    <Mail className="h-4 w-4" />
                  </TabsTrigger>
                  <TabsTrigger
                    value="phone"
                    className="data-[state=active]:bg-white data-[state=active]:text-black text-gray-600 hover:text-black transition-all duration-200"
                  >
                    <Phone className="h-4 w-4" />
                  </TabsTrigger>
                  <TabsTrigger
                    value="sms"
                    className="data-[state=active]:bg-white data-[state=active]:text-black text-gray-600 hover:text-black transition-all duration-200"
                  >
                    <MessageSquare className="h-4 w-4" />
                  </TabsTrigger>
                  <TabsTrigger
                    value="wifi"
                    className="data-[state=active]:bg-white data-[state=active]:text-black text-gray-600 hover:text-black transition-all duration-200"
                  >
                    <Wifi className="h-4 w-4" />
                  </TabsTrigger>
                  <TabsTrigger
                    value="location"
                    className="data-[state=active]:bg-white data-[state=active]:text-black text-gray-600 hover:text-black transition-all duration-200"
                  >
                    <MapPin className="h-4 w-4" />
                  </TabsTrigger>
                  <TabsTrigger
                    value="vcard"
                    className="data-[state=active]:bg-white data-[state=active]:text-black text-gray-600 hover:text-black transition-all duration-200"
                  >
                    <CreditCard className="h-4 w-4" />
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="text" className="space-y-4">
                  <div>
                    <Label className="text-black font-medium" htmlFor="text">
                      Text Content
                    </Label>
                    <Textarea
                      className="bg-white border-gray-300 text-black placeholder:text-gray-400 focus:border-black focus:ring-black/10"
                      id="text"
                      placeholder="Enter your text here..."
                      value={qrData.text}
                      onChange={(e) => updateQRData("text", e.target.value)}
                      rows={4}
                      maxLength={1000}
                    />
                    <div className="text-xs text-gray-500 mt-1">{qrData.text.length}/1000 characters</div>
                  </div>
                </TabsContent>

                <TabsContent value="url" className="space-y-4">
                  <div>
                    <Label className="text-black font-medium" htmlFor="url">
                      Website URL
                    </Label>
                    <Input
                      className={`bg-white border-gray-300 text-black placeholder:text-gray-400 focus:border-black focus:ring-black/10 ${validationErrors.url ? "border-red-500" : ""}`}
                      id="url"
                      placeholder="example.com or https://example.com"
                      value={qrData.url}
                      onChange={(e) => updateQRData("url", e.target.value)}
                    />
                    <ValidationError error={validationErrors.url} />
                  </div>
                </TabsContent>

                <TabsContent value="email" className="space-y-4">
                  <div>
                    <Label className="text-black font-medium" htmlFor="email-to">
                      Email Address
                    </Label>
                    <Input
                      className={`bg-white border-gray-300 text-black placeholder:text-gray-400 focus:border-black focus:ring-black/10 ${validationErrors.emailTo ? "border-red-500" : ""}`}
                      id="email-to"
                      type="email"
                      placeholder="recipient@example.com"
                      value={qrData.email.to}
                      onChange={(e) => updateNestedQRData("email", "to", e.target.value)}
                    />
                    <ValidationError error={validationErrors.emailTo} />
                  </div>
                  <div>
                    <Label className="text-black font-medium" htmlFor="email-subject">
                      Subject
                    </Label>
                    <Input
                      className={`bg-white border-gray-300 text-black placeholder:text-gray-400 focus:border-black focus:ring-black/10 ${validationErrors.emailSubject ? "border-red-500" : ""}`}
                      id="email-subject"
                      placeholder="Email subject"
                      value={qrData.email.subject}
                      onChange={(e) => updateNestedQRData("email", "subject", e.target.value)}
                      maxLength={100}
                    />
                    <ValidationError error={validationErrors.emailSubject} />
                    <div className="text-xs text-gray-500 mt-1">{qrData.email.subject.length}/100 characters</div>
                  </div>
                  <div>
                    <Label className="text-black font-medium" htmlFor="email-body">
                      Message
                    </Label>
                    <Textarea
                      className="bg-white border-gray-300 text-black placeholder:text-gray-400 focus:border-black focus:ring-black/10"
                      id="email-body"
                      placeholder="Email message"
                      value={qrData.email.body}
                      onChange={(e) => updateNestedQRData("email", "body", e.target.value)}
                      rows={3}
                      maxLength={500}
                    />
                    <div className="text-xs text-gray-500 mt-1">{qrData.email.body.length}/500 characters</div>
                  </div>
                </TabsContent>

                <TabsContent value="phone" className="space-y-4">
                  <div>
                    <Label className="text-black font-medium" htmlFor="phone">
                      Phone Number
                    </Label>
                    <Input
                      className={`bg-white border-gray-300 text-black placeholder:text-gray-400 focus:border-black focus:ring-black/10 ${validationErrors.phone ? "border-red-500" : ""}`}
                      id="phone"
                      placeholder="+1234567890"
                      value={qrData.phone}
                      onChange={(e) => handlePhoneInput(e.target.value, "phone")}
                    />
                    <ValidationError error={validationErrors.phone} />
                  </div>
                </TabsContent>

                <TabsContent value="sms" className="space-y-4">
                  <div>
                    <Label className="text-black font-medium" htmlFor="sms-number">
                      Phone Number
                    </Label>
                    <Input
                      className={`bg-white border-gray-300 text-black placeholder:text-gray-400 focus:border-black focus:ring-black/10 ${validationErrors.smsNumber ? "border-red-500" : ""}`}
                      id="sms-number"
                      placeholder="+1234567890"
                      value={qrData.sms.number}
                      onChange={(e) => handlePhoneInput(e.target.value, "number", "sms")}
                    />
                    <ValidationError error={validationErrors.smsNumber} />
                  </div>
                  <div>
                    <Label className="text-black font-medium" htmlFor="sms-message">
                      Message
                    </Label>
                    <Textarea
                      className={`bg-white border-gray-300 text-black placeholder:text-gray-400 focus:border-black focus:ring-black/10 ${validationErrors.smsMessage ? "border-red-500" : ""}`}
                      id="sms-message"
                      placeholder="SMS message"
                      value={qrData.sms.message}
                      onChange={(e) => updateNestedQRData("sms", "message", e.target.value)}
                      rows={3}
                      maxLength={160}
                    />
                    <ValidationError error={validationErrors.smsMessage} />
                    <div className="text-xs text-gray-500 mt-1">{qrData.sms.message.length}/160 characters</div>
                  </div>
                </TabsContent>

                <TabsContent value="wifi" className="space-y-4">
                  <div>
                    <Label className="text-black font-medium" htmlFor="wifi-ssid">
                      Network Name (SSID)
                    </Label>
                    <Input
                      className={`bg-white border-gray-300 text-black placeholder:text-gray-400 focus:border-black focus:ring-black/10 ${validationErrors.wifiSsid ? "border-red-500" : ""}`}
                      id="wifi-ssid"
                      placeholder="MyWiFiNetwork"
                      value={qrData.wifi.ssid}
                      onChange={(e) => updateNestedQRData("wifi", "ssid", e.target.value)}
                      maxLength={32}
                    />
                    <ValidationError error={validationErrors.wifiSsid} />
                    <div className="text-xs text-gray-500 mt-1">{qrData.wifi.ssid.length}/32 characters</div>
                  </div>
                  <div>
                    <Label className="text-black font-medium" htmlFor="wifi-password">
                      Password
                    </Label>
                    <Input
                      className={`bg-white border-gray-300 text-black placeholder:text-gray-400 focus:border-black focus:ring-black/10 ${validationErrors.wifiPassword ? "border-red-500" : ""}`}
                      id="wifi-password"
                      type="password"
                      placeholder="WiFi password"
                      value={qrData.wifi.password}
                      onChange={(e) => updateNestedQRData("wifi", "password", e.target.value)}
                      disabled={qrData.wifi.security === "nopass"}
                    />
                    <ValidationError error={validationErrors.wifiPassword} />
                  </div>
                  <div>
                    <Label className="text-black font-medium" htmlFor="wifi-security">
                      Security Type
                    </Label>
                    <Select
                      value={qrData.wifi.security}
                      onValueChange={(value) => updateNestedQRData("wifi", "security", value)}
                    >
                      <SelectTrigger className="bg-white border-gray-300 text-black focus:border-black">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="WPA">WPA/WPA2</SelectItem>
                        <SelectItem value="WEP">WEP</SelectItem>
                        <SelectItem value="nopass">No Password</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </TabsContent>

                <TabsContent value="location" className="space-y-4">
                  <div>
                    <Label className="text-black font-medium" htmlFor="latitude">
                      Latitude
                    </Label>
                    <Input
                      className={`bg-white border-gray-300 text-black placeholder:text-gray-400 focus:border-black focus:ring-black/10 ${validationErrors.latitude ? "border-red-500" : ""}`}
                      id="latitude"
                      placeholder="40.7128"
                      value={qrData.location.latitude}
                      onChange={(e) => handleNumberInput(e.target.value, "latitude", "location")}
                    />
                    <ValidationError error={validationErrors.latitude} />
                  </div>
                  <div>
                    <Label className="text-black font-medium" htmlFor="longitude">
                      Longitude
                    </Label>
                    <Input
                      className={`bg-white border-gray-300 text-black placeholder:text-gray-400 focus:border-black focus:ring-black/10 ${validationErrors.longitude ? "border-red-500" : ""}`}
                      id="longitude"
                      placeholder="-74.0060"
                      value={qrData.location.longitude}
                      onChange={(e) => handleNumberInput(e.target.value, "longitude", "location")}
                    />
                    <ValidationError error={validationErrors.longitude} />
                  </div>
                </TabsContent>

                <TabsContent value="vcard" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-black font-medium" htmlFor="vcard-firstname">
                        First Name
                      </Label>
                      <Input
                        className="bg-white border-gray-300 text-black placeholder:text-gray-400 focus:border-black focus:ring-black/10"
                        id="vcard-firstname"
                        placeholder="John"
                        value={qrData.vcard.firstName}
                        onChange={(e) => updateNestedQRData("vcard", "firstName", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label className="text-black font-medium" htmlFor="vcard-lastname">
                        Last Name
                      </Label>
                      <Input
                        className="bg-white border-gray-300 text-black placeholder:text-gray-400 focus:border-black focus:ring-black/10"
                        id="vcard-lastname"
                        placeholder="Doe"
                        value={qrData.vcard.lastName}
                        onChange={(e) => updateNestedQRData("vcard", "lastName", e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <Label className="text-black font-medium" htmlFor="vcard-org">
                      Organization
                    </Label>
                    <Input
                      className="bg-white border-gray-300 text-black placeholder:text-gray-400 focus:border-black focus:ring-black/10"
                      id="vcard-org"
                      placeholder="Company Name"
                      value={qrData.vcard.organization}
                      onChange={(e) => updateNestedQRData("vcard", "organization", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label className="text-black font-medium" htmlFor="vcard-phone">
                      Phone
                    </Label>
                    <Input
                      className={`bg-white border-gray-300 text-black placeholder:text-gray-400 focus:border-black focus:ring-black/10 ${validationErrors.vcardPhone ? "border-red-500" : ""}`}
                      id="vcard-phone"
                      placeholder="+1234567890"
                      value={qrData.vcard.phone}
                      onChange={(e) => handlePhoneInput(e.target.value, "phone", "vcard")}
                    />
                    <ValidationError error={validationErrors.vcardPhone} />
                  </div>
                  <div>
                    <Label className="text-black font-medium" htmlFor="vcard-email">
                      Email
                    </Label>
                    <Input
                      className={`bg-white border-gray-300 text-black placeholder:text-gray-400 focus:border-black focus:ring-black/10 ${validationErrors.vcardEmail ? "border-red-500" : ""}`}
                      id="vcard-email"
                      type="email"
                      placeholder="john@example.com"
                      value={qrData.vcard.email}
                      onChange={(e) => updateNestedQRData("vcard", "email", e.target.value)}
                    />
                    <ValidationError error={validationErrors.vcardEmail} />
                  </div>
                  <div>
                    <Label className="text-black font-medium" htmlFor="vcard-url">
                      Website
                    </Label>
                    <Input
                      className={`bg-white border-gray-300 text-black placeholder:text-gray-400 focus:border-black focus:ring-black/10 ${validationErrors.vcardUrl ? "border-red-500" : ""}`}
                      id="vcard-url"
                      placeholder="https://example.com"
                      value={qrData.vcard.url}
                      onChange={(e) => updateNestedQRData("vcard", "url", e.target.value)}
                    />
                    <ValidationError error={validationErrors.vcardUrl} />
                  </div>
                </TabsContent>
              </Tabs>

              {/* QR Code Settings */}
              <div className="mt-6 pt-6 border-t border-gray-200 space-y-4">
                <h3 className="font-semibold text-black">QR Code Settings</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-black font-medium" htmlFor="error-level">
                      Error Correction
                    </Label>
                    <Select value={errorLevel} onValueChange={(value: "L" | "M" | "Q" | "H") => setErrorLevel(value)}>
                      <SelectTrigger className="bg-white border-gray-300 text-black focus:border-black">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="L">Low (7%)</SelectItem>
                        <SelectItem value="M">Medium (15%)</SelectItem>
                        <SelectItem value="Q">Quartile (25%)</SelectItem>
                        <SelectItem value="H">High (30%)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-black font-medium" htmlFor="size">
                      Size (pixels)
                    </Label>
                    <Select value={size.toString()} onValueChange={(value) => setSize(Number.parseInt(value))}>
                      <SelectTrigger className="bg-white border-gray-300 text-black focus:border-black">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="128">128x128</SelectItem>
                        <SelectItem value="256">256x256</SelectItem>
                        <SelectItem value="512">512x512</SelectItem>
                        <SelectItem value="1024">1024x1024</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* QR Code Display Section - Only show when there's valid content */}
          {validationResult.isValid && (
            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardHeader className="border-b border-gray-200">
                <CardTitle className="text-black">Generated QR Code</CardTitle>
                <CardDescription className="text-gray-600">Scan with your device or download the image</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center space-y-4">
                <div className="bg-white p-6 rounded-lg border border-gray-200 mt-6">
                  <canvas ref={canvasRef} className="max-w-full h-auto" style={{ imageRendering: "pixelated" }} />
                </div>

                {qrCodeUrl && (
                  <Button
                    onClick={downloadQRCode}
                    className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-3 transition-colors duration-200"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download QR Code
                  </Button>
                )}

                <div className="w-full">
                  <Label className="text-black font-medium">Preview Data:</Label>
                  <div className="mt-2 p-3 bg-gray-50 border border-gray-200 rounded-md text-sm font-mono break-all max-h-32 overflow-y-auto text-gray-700">
                    {qrString}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-500 text-sm">
            Developed by {" "}
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black hover:text-gray-700 transition-colors duration-200 underline"
            >Jordi Ayala
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

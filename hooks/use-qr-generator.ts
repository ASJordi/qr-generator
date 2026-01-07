"use client"

import { useState, useEffect, useRef, useCallback, useMemo } from "react"
import QRCode from "qrcode"

interface QRData {
  text: string
  url: string
  email: {
    to: string
    subject: string
    body: string
  }
  phone: string
  sms: {
    number: string
    message: string
  }
  wifi: {
    ssid: string
    password: string
    security: string
    hidden: boolean
  }
  location: {
    latitude: string
    longitude: string
  }
  vcard: {
    firstName: string
    lastName: string
    organization: string
    phone: string
    email: string
    url: string
  }
}

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[+]?[0-9\s\-$$$$]{7,15}$/
  return phoneRegex.test(phone.trim())
}

const validateUrl = (url: string): boolean => {
  try {
    const urlToTest = url.startsWith("http") ? url : `https://${url}`
    new URL(urlToTest)
    return true
  } catch {
    return false
  }
}

const validateCoordinate = (coord: string, type: "lat" | "lng"): boolean => {
  const num = Number.parseFloat(coord)
  if (isNaN(num)) return false
  if (type === "lat") return num >= -90 && num <= 90
  return num >= -180 && num <= 180
}

export function useQRGenerator() {
  const [activeTab, setActiveTab] = useState("url")
  const [qrData, setQRData] = useState<QRData>({
    text: "",
    url: "",
    email: { to: "", subject: "", body: "" },
    phone: "",
    sms: { number: "", message: "" },
    wifi: { ssid: "", password: "", security: "WPA", hidden: false },
    location: { latitude: "", longitude: "" },
    vcard: {
      firstName: "",
      lastName: "",
      organization: "",
      phone: "",
      email: "",
      url: "",
    },
  })
  const [qrCodeUrl, setQrCodeUrl] = useState("")
  const [errorLevel, setErrorLevel] = useState<"L" | "M" | "Q" | "H">("M")
  const [size, setSize] = useState(1024)
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const generateQRString = useCallback(() => {
    switch (activeTab) {
      case "text":
        return qrData.text
      case "url":
        return qrData.url.startsWith("http") ? qrData.url : `https://${qrData.url}`
      case "email":
        return `mailto:${qrData.email.to}?subject=${encodeURIComponent(qrData.email.subject)}&body=${encodeURIComponent(qrData.email.body)}`
      case "phone":
        return qrData.phone.trim() ? `tel:${qrData.phone}` : ""
      case "sms":
        return `sms:${qrData.sms.number}?body=${encodeURIComponent(qrData.sms.message)}`
      case "wifi":
        return `WIFI:T:${qrData.wifi.security};S:${qrData.wifi.ssid};P:${qrData.wifi.password};H:${qrData.wifi.hidden ? "true" : "false"};;`
      case "location":
        return `geo:${qrData.location.latitude},${qrData.location.longitude}`
      case "vcard":
        return `BEGIN:VCARD
VERSION:3.0
FN:${qrData.vcard.firstName} ${qrData.vcard.lastName}
ORG:${qrData.vcard.organization}
TEL:${qrData.vcard.phone}
EMAIL:${qrData.vcard.email}
URL:${qrData.vcard.url}
END:VCARD`
      default:
        return ""
    }
  }, [activeTab, qrData])

  const validationResult = useMemo(() => {
    const errors: Record<string, string> = {}
    let hasContent = false

    switch (activeTab) {
      case "text":
        hasContent = qrData.text.trim().length > 0
        break
      case "url":
        hasContent = qrData.url.trim().length > 0
        if (hasContent && !validateUrl(qrData.url)) {
          errors.url = "Please enter a valid URL"
        }
        break
      case "email":
        hasContent = qrData.email.to.trim().length > 0
        if (hasContent && !validateEmail(qrData.email.to)) {
          errors.emailTo = "Please enter a valid email address"
        }
        if (qrData.email.subject.length > 100) {
          errors.emailSubject = "Subject should be less than 100 characters"
        }
        break
      case "phone":
        hasContent = qrData.phone.trim().length > 0
        if (hasContent && !validatePhone(qrData.phone)) {
          errors.phone = "Please enter a valid phone number"
        }
        break
      case "sms":
        hasContent = qrData.sms.number.trim().length > 0
        if (hasContent && !validatePhone(qrData.sms.number)) {
          errors.smsNumber = "Please enter a valid phone number"
        }
        if (qrData.sms.message.length > 160) {
          errors.smsMessage = "SMS message should be less than 160 characters"
        }
        break
      case "wifi":
        hasContent = qrData.wifi.ssid.trim().length > 0
        if (qrData.wifi.ssid.length > 32) {
          errors.wifiSsid = "Network name should be less than 32 characters"
        }
        if (qrData.wifi.security !== "nopass" && qrData.wifi.password.length < 8) {
          errors.wifiPassword = "Password should be at least 8 characters"
        }
        break
      case "location":
        hasContent = qrData.location.latitude.trim().length > 0 && qrData.location.longitude.trim().length > 0
        if (qrData.location.latitude && !validateCoordinate(qrData.location.latitude, "lat")) {
          errors.latitude = "Latitude must be between -90 and 90"
        }
        if (qrData.location.longitude && !validateCoordinate(qrData.location.longitude, "lng")) {
          errors.longitude = "Longitude must be between -180 and 180"
        }
        break
      case "vcard":
        hasContent = qrData.vcard.firstName.trim().length > 0 || qrData.vcard.lastName.trim().length > 0
        if (qrData.vcard.email && !validateEmail(qrData.vcard.email)) {
          errors.vcardEmail = "Please enter a valid email address"
        }
        if (qrData.vcard.phone && !validatePhone(qrData.vcard.phone)) {
          errors.vcardPhone = "Please enter a valid phone number"
        }
        if (qrData.vcard.url && !validateUrl(qrData.vcard.url)) {
          errors.vcardUrl = "Please enter a valid URL"
        }
        break
    }

    return {
      errors,
      isValid: hasContent && Object.keys(errors).length === 0,
    }
  }, [activeTab, qrData])

  useEffect(() => {
    setValidationErrors(validationResult.errors)
  }, [validationResult.errors])

  const generateQRCode = useCallback(async () => {
    const qrString = generateQRString()
    if (!qrString.trim() || !validationResult.isValid) return

    try {
      const canvas = canvasRef.current
      if (canvas) {
        await QRCode.toCanvas(canvas, qrString, {
          errorCorrectionLevel: errorLevel,
          width: 256,
          margin: 2,
          color: {
            dark: "#000000",
            light: "#ffffff",
          },
        })

        const downloadCanvas = document.createElement("canvas")
        await QRCode.toCanvas(downloadCanvas, qrString, {
          errorCorrectionLevel: errorLevel,
          width: size,
          margin: 2,
          color: {
            dark: "#000000",
            light: "#ffffff",
          },
        })

        const dataUrl = downloadCanvas.toDataURL()
        setQrCodeUrl(dataUrl)
      }
    } catch (error) {
      console.error("Error generating QR code:", error)
    }
  }, [generateQRString, validationResult.isValid, errorLevel, size])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      generateQRCode()
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [generateQRCode])

  const updateQRData = useCallback((field: string, value: any) => {
    setQRData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }, [])

  const updateNestedQRData = useCallback((parent: string, field: string, value: any) => {
    setQRData((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent as keyof QRData],
        [field]: value,
      },
    }))
  }, [])

  const handlePhoneInput = useCallback(
    (value: string, field: string, parent?: string) => {
      const cleanValue = value.replace(/[^0-9\s\-$$$$+]/g, "")
      if (parent) {
        updateNestedQRData(parent, field, cleanValue)
      } else {
        updateQRData(field, cleanValue)
      }
    },
    [updateNestedQRData, updateQRData],
  )

  const handleNumberInput = useCallback(
    (value: string, field: string, parent: string) => {
      const cleanValue = value.replace(/[^0-9.-]/g, "")
      updateNestedQRData(parent, field, cleanValue)
    },
    [updateNestedQRData],
  )

  const downloadQRCode = useCallback(() => {
    if (qrCodeUrl) {
      const link = document.createElement("a")
      link.download = `qr-code-${activeTab}.png`
      link.href = qrCodeUrl
      link.click()
    }
  }, [qrCodeUrl, activeTab])

  return {
    // State
    activeTab,
    qrData,
    qrCodeUrl,
    errorLevel,
    size,
    validationErrors,
    canvasRef,

    // Computed values
    validationResult,
    qrString: generateQRString(),

    // Actions
    setActiveTab,
    setErrorLevel,
    setSize,
    updateQRData,
    updateNestedQRData,
    handlePhoneInput,
    handleNumberInput,
    downloadQRCode,
  }
}

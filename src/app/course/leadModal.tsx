import React, { useState, useRef, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Textarea,
  Select,
  SelectItem,
  useDisclosure,
} from "@nextui-org/react";
// import { useAnalytics } from "./AnalyticsProvider";

// Declare Turnstile for TypeScript
declare global {
  interface Window {
    turnstile: {
      render: (
        element: string | HTMLElement,
        options: Record<string, unknown>,
      ) => string;
      reset: (widgetId?: string) => void;
      getResponse: (widgetId?: string) => string;
    };
  }
}

interface LeadCaptureModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  initialPackage?: "basic" | "standard" | "individual";
}

interface FormData {
  email: string;
  name: string;
  package: "basic" | "standard" | "individual";
  comments: string;
  phone: string;
}

const PACKAGES = [
  { key: "basic", label: "Базовий (1500 грн)" },
  { key: "standard", label: "Стандарт (3000 грн)" },
  { key: "individual", label: "Індивідуальний (7500 грн)" },
];

const LeadCaptureModal: React.FC<LeadCaptureModalProps> = ({
  isOpen,
  onOpenChange,
  initialPackage = "standard",
}) => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    name: "",
    package: initialPackage,
    comments: "",
    phone: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [turnstileLoaded, setTurnstileLoaded] = useState(false);
  const turnstileRef = useRef<HTMLDivElement>(null);
  const turnstileWidgetId = useRef<string>("");

  // const analytics = useAnalytics();

  // Load Turnstile script when modal opens
  useEffect(() => {
    if (isOpen && !turnstileLoaded) {
      const script = document.createElement("script");
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
      script.async = true;
      script.defer = true;
      script.onload = () => {
        setTurnstileLoaded(true);
      };
      document.head.appendChild(script);

      return () => {
        // Cleanup script when component unmounts
        const existingScript = document.querySelector(
          'script[src*="turnstile"]',
        );
        if (existingScript) {
          existingScript.remove();
        }
      };
    }
  }, [isOpen, turnstileLoaded]);

  // Render Turnstile widget when script is loaded
  useEffect(() => {
    if (turnstileLoaded && isOpen && turnstileRef.current && window.turnstile) {
      turnstileWidgetId.current = window.turnstile.render(
        turnstileRef.current,
        {
          sitekey: "0x4AAAAAABi9MAz9s3TT6v70",
          callback: () => {
            console.log("Turnstile verification complete");
          },
          "error-callback": () => {
            setError("CAPTCHA verification failed. Please try again.");
          },
        },
      );
    }
  }, [turnstileLoaded, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Get Turnstile response
      const turnstileResponse = window.turnstile?.getResponse(
        turnstileWidgetId.current,
      );

      if (!turnstileResponse) {
        setError("Please complete the CAPTCHA verification.");
        setIsLoading(false);
        return;
      }

      // analytics.trackEvent("Course Lead Form Submitted", 1, {
      //   package: formData.package,
      // });

      const response = await fetch("https://course-leads.kuzzmi.workers.dev/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          "cf-turnstile-response": turnstileResponse,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Щось пішло не так");
      }

      setSuccess(true);
      // analytics.trackEvent("Course Lead Form Success", 1, {
      //   package: formData.package,
      // });

      // Reset form after 3 seconds and close modal
      setTimeout(() => {
        setFormData({
          email: "",
          name: "",
          package: initialPackage,
          comments: "",
          phone: "",
        });
        setSuccess(false);
        onOpenChange(false);
        // Reset Turnstile
        if (window.turnstile) {
          window.turnstile.reset(turnstileWidgetId.current);
        }
      }, 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Виникла помилка");
      // analytics.trackEvent("Course Lead Form Error", 1, {
      //   package: formData.package,
      //   error: err instanceof Error ? err.message : "Unknown error",
      // });

      // Reset Turnstile on error
      if (window.turnstile) {
        window.turnstile.reset(turnstileWidgetId.current);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError(""); // Clear error when user types
  };

  if (success) {
    return (
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="md">
        <ModalContent>
          <ModalBody className="text-center py-12">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold mb-4 text-success">Дякуємо!</h2>
            <p className="text-lg">
              Ми отримали вашу заявку і зв&apos;яжемося з вами найближчим часом
              для узгодження деталей.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Це вікно закриється автоматично через кілька секунд...
            </p>
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  }

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="lg"
      scrollBehavior="inside"
    >
      <ModalContent>
        {(onClose) => (
          <form onSubmit={handleSubmit}>
            <ModalHeader className="flex flex-col gap-1">
              <h2 className="text-2xl">Приєднатися до курсу</h2>
              <p className="text-sm text-gray-600">
                Заповніть форму і ми зв&apos;яжемося з вами для узгодження
                деталей
              </p>
            </ModalHeader>

            <ModalBody>
              <div className="space-y-4">
                <Input
                  label="Email"
                  type="email"
                  isRequired
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  description="На цей email ми надішлемо деталі курсу"
                />

                <Input
                  label="Ім'я"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  description="Як до вас звертатися?"
                />

                <Select
                  label="Оберіть пакет"
                  isRequired
                  selectedKeys={[formData.package]}
                  onChange={(e) => handleInputChange("package", e.target.value)}
                >
                  {PACKAGES.map((pkg) => (
                    <SelectItem key={pkg.key} value={pkg.key}>
                      {pkg.label}
                    </SelectItem>
                  ))}
                </Select>

                {/*
                <Input
                  label="Телефон (опціонально)"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  description="Для швидкого зв'язку"
                /> */}

                <Textarea
                  label="Коментарі або питання"
                  value={formData.comments}
                  onChange={(e) =>
                    handleInputChange("comments", e.target.value)
                  }
                  description="Розкажіть, що вас цікавить або які у вас очікування від курсу"
                  minRows={3}
                />

                {error && (
                  <div className="p-3 bg-danger-50 border border-danger-200 rounded-lg">
                    <p className="text-danger text-sm">{error}</p>
                  </div>
                )}

                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-700">
                    <strong>Важливо:</strong> Система онлайн-платежів ще в
                    розробці. Після заповнення форми ми зв&apos;яжемося з вами
                    для узгодження способу оплати та надання доступу до курсу.
                  </p>
                </div>
                <div className="flex justify-center">
                  <div ref={turnstileRef} />
                </div>
              </div>
            </ModalBody>

            <ModalFooter>
              <Button
                color="danger"
                variant="light"
                onPress={onClose}
                isDisabled={isLoading}
              >
                Скасувати
              </Button>
              <Button
                color="warning"
                type="submit"
                isLoading={isLoading}
                // loadingText="Надсилаємо..."
              >
                Надіслати заявку
              </Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
};

// Hook for using the modal
export const useLeadCaptureModal = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedPackage, setSelectedPackage] = useState<
    "basic" | "standard" | "individual"
  >("standard");

  const openModal = (
    packageType: "basic" | "standard" | "individual" = "standard",
  ) => {
    setSelectedPackage(packageType);
    onOpen();
  };

  return {
    isOpen,
    onOpenChange,
    openModal,
    selectedPackage,
    Modal: (
      props: Omit<
        LeadCaptureModalProps,
        "isOpen" | "onOpenChange" | "initialPackage"
      >,
    ) => (
      <LeadCaptureModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        initialPackage={selectedPackage}
        {...props}
      />
    ),
  };
};

export default LeadCaptureModal;

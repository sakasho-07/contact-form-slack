"use client";

import { useState } from "react";
import { contactSchema } from "@/lib/contact-schema";

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string[] | undefined>>({});
  const [statusMessage, setStatusMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setStatusMessage("");
    setIsError(false);

    const result = contactSchema.safeParse({
      name,
      email,
      message,
    });

    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          message,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setIsError(true);
        setStatusMessage(data.message || "送信に失敗しました。");
        return;
      }

      setIsError(false);
      setStatusMessage("お問い合わせを受け付けました！");
      console.log("APIからの返事:", data);
    } catch (error) {
      console.error("送信エラー:", error);
      setIsError(true);
      setStatusMessage("通信に失敗しました。時間をおいて再度お試しください。");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="mx-auto max-w-xl rounded-xl bg-white p-8 shadow-sm">
        <h1 className="mb-2 text-2xl font-bold text-gray-900">
          お問い合わせ
        </h1>

        <p className="mb-8 text-sm text-gray-600">
          以下のフォームに必要事項を入力してください。
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              お名前
            </label>

            <input
              id="name"
              name="name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-500"
              placeholder="山田 太郎"
            />
            {errors.name?.[0] && (
              <p className="mt-1 text-sm text-red-600">
                {errors.name[0]}
              </p>
            )}

          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              メールアドレス
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-500"
              placeholder="example@example.com"
            />

            {errors.email?.[0] && (
              <p className="mt-1 text-sm text-red-600">
                {errors.email[0]}
              </p>
            )}


          </div>

          <div>
            <label
              htmlFor="message"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              お問い合わせ内容
            </label>
            <textarea
              id="message"
              name="message"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              rows={5}
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-500"
              placeholder="お問い合わせ内容を入力してください"
            />
            {errors.message?.[0] && (
              <p className="mt-1 text-sm text-red-600">
                {errors.message[0]}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full rounded-md px-4 py-3 font-medium text-white transition-colors ${isSubmitting
              ? "cursor-not-allowed bg-gray-400"
              : "bg-blue-600 hover:bg-blue-700"
              }`}
          >
            {isSubmitting ? "送信中..." : "送信する"}
          </button>
        </form>
        {statusMessage && (
          <p
            className={`mt-4 text-sm ${isError ? "text-red-600" : "text-green-600"
              }`}
          >
            {statusMessage}
          </p>
        )}
      </div>
    </main>
  );
}

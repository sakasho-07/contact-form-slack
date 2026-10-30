
import { contactSchema } from "@/lib/contact-schema";

export async function POST(request: Request) {
    const body = await request.json();

    const result = contactSchema.safeParse(body);

    if (!result.success) {
        return Response.json(
            {
                message: "入力内容に誤りがあります",
                errors: result.error.flatten().fieldErrors,
            },
            { status: 400 }
        );
    }

    const webhookUrl = process.env.SLACK_WEBHOOK_URL;

    if (!webhookUrl) {
        return Response.json(
            { message: "Slackの設定がありません" },
            { status: 500 }
        );
    }
    const slackResponse = await fetch(webhookUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            text: `お問い合わせがありました
お名前: ${result.data.name}
メールアドレス: ${result.data.email}
内容: ${result.data.message}`,
        }),
    });

    if (!slackResponse.ok) {
        return Response.json(
            { message: "Slackへの通知に失敗しました" },
            { status: 502 }
        );
    }

    console.log("受け取ったデータ:", result.data);

    return Response.json({
        message: "お問い合わせを受け付け、Slackへ通知しました",
    });
}

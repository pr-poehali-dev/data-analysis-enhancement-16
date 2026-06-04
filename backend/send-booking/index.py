import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    """Отправка заявки на бронирование тура на почту агентства."""

    cors_headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": cors_headers, "body": ""}

    try:
        body = json.loads(event.get("body", "{}"))
    except Exception:
        return {"statusCode": 400, "headers": cors_headers, "body": json.dumps({"error": "Invalid JSON"})}

    name = body.get("name", "").strip()
    phone = body.get("phone", "").strip()
    tour = body.get("tour", "").strip()
    comment = body.get("comment", "").strip()

    if not name or not phone:
        return {
            "statusCode": 400,
            "headers": cors_headers,
            "body": {"error": "Имя и телефон обязательны"},
        }

    smtp_password = os.environ.get("SMTP_PASSWORD", "")
    from_email = "sertih1423@gmail.com"
    to_email = "sertih1423@gmail.com"

    subject = f"Новая заявка на тур: {tour or 'не указан'}"
    html_body = f"""
    <h2>Новая заявка на бронирование</h2>
    <table style="border-collapse:collapse; font-family:Arial,sans-serif;">
      <tr><td style="padding:8px;color:#666;">Имя:</td><td style="padding:8px;font-weight:bold;">{name}</td></tr>
      <tr><td style="padding:8px;color:#666;">Телефон:</td><td style="padding:8px;font-weight:bold;">{phone}</td></tr>
      <tr><td style="padding:8px;color:#666;">Тур:</td><td style="padding:8px;">{tour or '—'}</td></tr>
      <tr><td style="padding:8px;color:#666;">Комментарий:</td><td style="padding:8px;">{comment or '—'}</td></tr>
    </table>
    <p style="color:#888;font-size:12px;">Авиа Некст Тур — автоматическое уведомление</p>
    """

    msg = MIMEMultipart("alternative")
    msg["Subject"] = subject
    msg["From"] = from_email
    msg["To"] = to_email
    msg.attach(MIMEText(html_body, "html", "utf-8"))

    try:
        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
            server.login(from_email, smtp_password)
            server.sendmail(from_email, to_email, msg.as_string())
    except Exception as e:
        return {
            "statusCode": 500,
            "headers": cors_headers,
            "body": json.dumps({"error": f"Ошибка отправки: {str(e)}"}),
        }

    return {
        "statusCode": 200,
        "headers": cors_headers,
        "body": json.dumps({"success": True, "message": "Заявка отправлена"}),
    }
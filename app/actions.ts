'use server'

import webpush from 'web-push'

webpush.setVapidDetails(
  'mailto:htikewaikyawmmocc@gmail.com',
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
)

// Use the correct type for web-push
import { PushSubscription as WebPushSubscription } from 'web-push'

let subscription: WebPushSubscription | null = null

// Convert the native PushSubscription to a web-push-compatible format
function convertToWebPushSubscription(sub: PushSubscription): WebPushSubscription {
  return {
    endpoint: sub.endpoint,
    expirationTime: sub.expirationTime,
    keys: {
      p256dh: sub.toJSON().keys?.p256dh || '',
      auth: sub.toJSON().keys?.auth || ''
    }
  }
}

export async function subscribeUser(sub: PushSubscription) {
  // Convert the subscription to the required format
  subscription = convertToWebPushSubscription(sub)

  // In a production environment, you would want to store the subscription in a database
  // For example: await db.subscriptions.create({ data: subscription })
  return { success: true }
}

export async function unsubscribeUser() {
  subscription = null
  // In a production environment, you would want to remove the subscription from the database
  // For example: await db.subscriptions.delete({ where: { ... } })
  return { success: true }
}

export async function sendNotification(message: string) {
  if (!subscription) {
    throw new Error('No subscription available')
  }

  try {
    await webpush.sendNotification(
      subscription,
      JSON.stringify({
        title: 'Test Notification',
        body: message,
        icon: '/icon.png',
      })
    )
    return { success: true }
  } catch (error) {
    console.error('Error sending push notification:', error)
    return { success: false, error: 'Failed to send notification' }
  }
}

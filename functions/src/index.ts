import * as admin from "firebase-admin";
import { onSchedule } from "firebase-functions/v2/scheduler";

admin.initializeApp();
const db = admin.firestore();

enum MessageStatus {
  AGENDADO = "agendado",
  ENVIADO = "enviado",
}

export const checkScheduledMessages = onSchedule(
  "every 1 minutes",
  async () => {
    const now = admin.firestore.Timestamp.now();

    const snapshot = await db
      .collection("messages")
      .where("status", "==", MessageStatus.AGENDADO)
      .where("scheduledAt", "<=", now)
      .get();

    const updates = snapshot.docs.map((doc) => {
      return doc.ref.update({ status: MessageStatus.ENVIADO });
    });

    await Promise.all(updates);

    console.log(
      `✅ ${updates.length} mensagem(ns) atualizada(s) para '${MessageStatus.ENVIADO}'`
    );
  }
);

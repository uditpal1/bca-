/* =============================================
   BCANotes — telegram.js
   =============================================

   TESTING VERSION ONLY

   IMPORTANT:
   Bot Token is stored directly in this file.

   DO NOT use this version on a public
   GitHub repository or production website.

   ============================================= */


// ============================================================
// TELEGRAM BOT CONFIGURATION
// ============================================================

// Apne Telegram BotFather se mila Bot Token yahan paste karo
const TELEGRAM_BOT_TOKEN =
  'YOUR_BOT_TOKEN_HERE';


// Jis Telegram chat/user ko form details receive karni hain
const TELEGRAM_CHAT_ID =
  'YOUR_CHAT_ID_HERE';


// ============================================================
// SEND LEAD TO TELEGRAM
// ============================================================

async function sendLeadToTelegram(data) {

  try {

    // Telegram Bot API URL
    const url =
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;


    // Telegram par bheja jane wala message
    const message =
`📚 BCANotes New Unlock

👤 Name: ${data.name}
📱 Mobile: ${data.mobile}

🎓 Semester: ${data.semester}
📖 Subject: ${data.subject}
📝 Note: ${data.note_title}`;


    // Telegram API request
    const response =
      await fetch(
        url,
        {
          method: 'POST',

          headers: {
            'Content-Type':
              'application/json'
          },

          body: JSON.stringify({

            chat_id:
              TELEGRAM_CHAT_ID,

            text:
              message

          })
        }
      );


    // Telegram ka response read karo
    const result =
      await response.json();


    // Agar Telegram ne error diya
    if (
      !response.ok ||
      !result.ok
    ) {

      console.error(
        'Telegram Error:',
        result
      );

      return false;
    }


    // Successful message
    console.log(
      'Telegram message sent successfully'
    );

    return true;

  }


  // Network/API error
  catch (error) {

    console.error(
      'Telegram request failed:',
      error
    );

    return false;
  }

}

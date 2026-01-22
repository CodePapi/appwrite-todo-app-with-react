// functions/send-welcome-email/src/main.js
export default async ({ req, res, log, error }) => {
    // The event 'users.*.create' provides user data in the request
    const user = req.body;
  
    log(`Sending welcome email to: ${user.email}`);
  
    try {
      // In a real scenario, you'd use:
      // await mailService.send({ to: user.email, subject: 'Welcome to Comuneo!' });
      
      return res.json({
        message: `Welcome email successfully queued for ${user.name}`,
      });
    } catch (err) {
      error('Failed to send email: ' + err.message);
      return res.json({ ok: false }, 500);
    }
  };
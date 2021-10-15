// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import nameGenerator from '@rstacruz/startup-name-generator';

export default function handler(req, res) {
    const userInput = req.body.userInput;
    const names = nameGenerator(userInput)
    res.status(200).json({ names })
  }
  
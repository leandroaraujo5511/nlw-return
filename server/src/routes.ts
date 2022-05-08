import express from 'express';
import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailer-mail-adapter';
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-repository';
import { SubmitFeedbackUseCase } from './use-cases/submit-feedback-use-case';

export const router = express.Router();




router.post('/feedback', async (req, res) => {
       
    const {type, comment, screenshot} = req.body;

    const primaFeedbackRespository = new PrismaFeedbacksRepository();
    const nodemailerMailAdapter = new NodemailerMailAdapter();

    const submitFeedbackUseCase =  new SubmitFeedbackUseCase(
        primaFeedbackRespository,
        nodemailerMailAdapter
    )
    

    await submitFeedbackUseCase.execute({
        type, 
        comment, 
        screenshot
    })

    return res.status(201).send()
})
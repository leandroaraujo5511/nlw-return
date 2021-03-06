import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";


const createFeedbackSpy = jest.fn()
const sendMailSpy = jest.fn()

const submitFeedback = new SubmitFeedbackUseCase(
    {create: createFeedbackSpy},
    {sendMail: sendMailSpy}
);

describe('Submit feedback', () => {
    it('should be able to submit a feedback', async () => {  
        await expect(submitFeedback.execute({
            type:'BUG',
            comment:'exemple comment',
            screenshot: 'data:image/png;base64.jpg'
        })).resolves.not.toThrow();

        expect(createFeedbackSpy).toBeCalled();
        expect(sendMailSpy).toBeCalled();

    });

    it('should not be able to submit a feedback without type', async () => {  
        await expect(submitFeedback.execute({
            type:'',
            comment:'example comment',
            screenshot: 'data:image/png;base64.jpg'
        })).rejects.toThrow();
    });

    it('should not be able to submit a feedback without comment', async () => {  
        await expect(submitFeedback.execute({
            type:'BUG',
            comment:'',
            screenshot: 'data:image/png;base64.jpg'
        })).rejects.toThrow();
    });

    it('should not be able to submit a feedback without comment', async () => {  
        await expect(submitFeedback.execute({
            type:'BUG',
            comment:'example comment',
            screenshot: 'test.jpg'
        })).rejects.toThrow();
    });
});
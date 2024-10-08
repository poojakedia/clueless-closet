const vision = require('@google-cloud/vision');

const client = new vision.ImageAnnotatorClient({
  credentials: JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS)
});
export async function POST(req){
    const {image} = await req.json();
    const imageData = image.replace(/^data:image\/\w+;base64,/, '');
        try{
            
            const buffer = Buffer.from(imageData, 'base64');
            const [response] = await client.labelDetection({
                image: {
                    content: buffer }
            });
            const labels = response.labelAnnotations.map(label => label.description);
            return new Response(JSON.stringify({labels}), {
                status:200,
                headers: { 'Content-Type': 'application/json' }
            });
        } catch(error){
            console.log(error);
            return new Response(JSON.stringify({message: error.message}),{
                status:500,
                headers: { 'Content-Type': 'application/json' },
            });
        }

}

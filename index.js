import { Ai } from './vendor/@cloudflare/ai';

export default {
  async fetch(request, env) {
    if (request.method === 'PUT') {
    try {
      // Get the image data from the request body as an ArrayBuffer
      const imageArrayBuffer = await request.arrayBuffer();


      const ai = new Ai(env.AI);
      const inputs = {
        image: [...new Uint8Array(imageArrayBuffer)]
      };
  
      const response = await ai.run('@cf/microsoft/resnet-50', inputs);
      return Response.json({ inputs: { image: [] }, response });

    } catch (error) {
      // Handle any errors that may occur during the processing
      return new Response('Error processing the image', { status: 500 });
    }
  } else {
    // If the request method is not PUT, return an error response
    return new Response('Invalid request method', { status: 405 });
  }
   
  }
};



/*
Uint8Array: Uint8Array is a typed array in JavaScript that represents an array of 8-bit unsigned integers.
 It's often used for handling binary data, such as image data.

The use of the spread operator (...) in JavaScript is to create a new array or object that contains the elements or properties of an existing array or object. It is used for various purposes, such as copying data, merging arrays, or converting data between different data structures. 
In the specific context of your code:
*/

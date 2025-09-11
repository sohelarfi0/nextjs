// "use client"

// import React, { useActionState, useState } from 'react'
// import { Input } from './ui/input';
// import { Textarea } from './ui/textarea';
// import MDEditor from '@uiw/react-md-editor'
// import { Button } from './ui/button';
// import { Send } from 'lucide-react';
// import { formSchema } from '@/lib/validation';
// import { z } from 'zod';
// import { toast} from 'react-hot-toast';
// import { useToast } from '@/hooks/use-toast';
// import { createPitch } from '@/lib/action';
// import { useRouter } from 'next/router';
// // import { createIdea } from '@/lib/actions/idea';
// export const StartupForm = () => {

//     const [errors,setErrors]=useState<Record<string,string>>({})
//     const[pitch,setPitch]=useState("");
//    const {toast}=useToast();
//     const router=useRouter();

//     const handleFormSubmit = async (
//         prevState: { error: string; status: string },
//         formData: FormData
//     ) => {
//         try{
//             const formValues={
//                 title:formData.get("title") as string,
//                 description:formData.get("description") as string,
//                 category:formData.get("category") as string,
//                 link:formData.get("link") as string,
//                 pitch,
//             }
//             await formSchema.parseAsync(formValues);

//             const result=await createPitch(prevState,formData,pitch);

//             if(result.status=="SUCCESS"){
//                 toast({
//                     title:"Success",
//                     description:"Your startup pitch has been created successfully.",
//                 });
//                 router.push(`/startup/${result._id}`)
//             }

//             return result;
            

//         }
//         catch(error){
//             if(error instanceof z.ZodError){
//                 const fieldErrors =error.flatten().fieldErrors;

//                 setErrors(fieldErrors as unknown as Record<string,string>);

//                 toast({
//                     title:"Error",
//                     description:"Please check your inputs and try again",
//                     variant:"destructive",
//                 });

//                 return {...prevState,error:"Validation failed",status:"ERROR"};


//             }

//             toast({
//                     title:"Error",
//                     description:"Please check your inputs and try again",
//                     variant:"destructive",
//                 });

//             return {
//                 ...prevState,
//                 error:"An unexpected error  has occured",
//                 status:"ERROR",

//             };

//         }
//     };

//     const [/*state*/,formAction,isPending]=useActionState(handleFormSubmit,
//         {
//             error:"",
//             status:"INITIAL",
//         });



//   return (
//     <form  action={formAction} className='startup-form'>
//         <div>
//             <label htmlFor="title" className='startup-form-label'>
//                 Title 
//             </label>
//             <Input
//             id="title" name='title' 
//             className='startup-form-input' 
//             required
//              placeholder='Startup Title'

//             />

//             {errors.title && <p className='startup-form-error'>{errors.title} </p>}
            
//         </div>
//         <div>
//             <label htmlFor="description" className='startup-form-label'>
//                 Description
//             </label>
//             <Textarea
//             id="description" name='description' 
//             className='startup-form-input' 
//             required
//              placeholder='Startup description'

//             />

//             {errors.description && <p className='startup-form-error'>{errors.description} </p>}

//         </div>
//         <div>
//             <label htmlFor="category" className='startup-form-label'>
//                 Category
//             </label>
//             <Input
//             id="category" name='category' 
//             className='startup-form-input' 
//             required
//              placeholder='Startup Category'

//             />

//             {errors.category && <p className='startup-form-error'>{errors.category} </p>}

//         </div>
//         <div>
//             <label htmlFor="link" className='startup-form-label'>
//                 Image URL
//             </label>
//             <Input
//             id="link" name='link' 
//             className='startup-form-input' 
//             required
//              placeholder='Startup Image URL'

//             />

//             {errors.link && <p className='startup-form-error'>{errors.link} </p>}

//         </div>
//         <div data-color-mode="light">
//             <label htmlFor="pitch" className='startup-form-label'>
//                 Pitch
//             </label>
//             <MDEditor
//             value={pitch}
//             onChange={(value)=>setPitch(value as string)}
//             id="pitch"
//             preview='edit'
//             height={300}
//             style={{borderRadius:20,overflow:"hidden"}}
//             textareaProps={{
//                 placeholder:
//                 "Briefly describe your idea and what problem it solves",
//             }}
//             previewOptions={{
//                 disallowedElements:["style"],
//             }}
//             />

//             {errors.pitch && <p className='startup-form-error'>{errors.pitch} </p>}

//         </div>
//         <Button  type='submit' className='startup-form-bttn text-white' 
//         disabled={isPending}>{isPending? "Submitting...":"Submit Your Pitch"}
//         <Send className='size-6 ml-2'/>
//         </Button>
//     </form>
//   )
// }

// export default StartupForm;
















// // prevState: { error?: string; status?: string }




















"use client"

import React, { useActionState, useState } from 'react'
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import MDEditor from '@uiw/react-md-editor'
import { Button } from './ui/button';
import { Send } from 'lucide-react';
import { formSchema } from '@/lib/validation';
import { z } from 'zod';
import { toast } from 'react-hot-toast'; // FIX: Use toast directly from react-hot-toast
import { createPitch } from '@/lib/action';
// import { useRouter } from 'next/router';
import { useRouter } from 'next/navigation';


export const StartupForm = () => {

    const [errors, setErrors] = useState<Record<string, string>>({})
    const [pitch, setPitch] = useState("");
    const router = useRouter();

    const handleFormSubmit = async (
        prevState: { error: string; status: string },
        formData: FormData
    ) => {
        try {
            const formValues = {
                title: formData.get("title") as string,
                description: formData.get("description") as string,
                category: formData.get("category") as string,
                link: formData.get("link") as string,
                pitch,
            }
            await formSchema.parseAsync(formValues);

            const result = await createPitch(prevState, formData, pitch);

            if (result.status == "SUCCESS") {
                toast.success("Your startup pitch has been created successfully.");
                router.push(`/startup/${result._id}`)
            }

            return result;

        } catch (error) {
            if (error instanceof z.ZodError) {
                const fieldErrors = error.flatten().fieldErrors;

                setErrors(fieldErrors as unknown as Record<string, string>);

                toast.error("Please check your inputs and try again");

                return { ...prevState, error: "Validation failed", status: "ERROR" };
            }

            toast.error("An unexpected error has occurred");

            return {
                ...prevState,
                error: "An unexpected error has occurred",
                status: "ERROR",
            };
        }
    };

    const [, formAction, isPending] = useActionState(handleFormSubmit, {
        error: "",
        status: "INITIAL",
    });

    return (
        <form action={formAction} className='startup-form'>
            <div>
                <label htmlFor="title" className='startup-form-label'>
                    Title
                </label>
                <Input
                    id="title" name='title'
                    className='startup-form-input'
                    required
                    placeholder='Startup Title'
                />
                {errors.title && <p className='startup-form-error'>{errors.title} </p>}
            </div>
            <div>
                <label htmlFor="description" className='startup-form-label'>
                    Description
                </label>
                <Textarea
                    id="description" name='description'
                    className='startup-form-input'
                    required
                    placeholder='Startup description'
                />
                {errors.description && <p className='startup-form-error'>{errors.description} </p>}
            </div>
            <div>
                <label htmlFor="category" className='startup-form-label'>
                    Category
                </label>
                <Input
                    id="category" name='category'
                    className='startup-form-input'
                    required
                    placeholder='Startup Category'
                />
                {errors.category && <p className='startup-form-error'>{errors.category} </p>}
            </div>
            <div>
                <label htmlFor="link" className='startup-form-label'>
                    Image URL
                </label>
                <Input
                    id="link" name='link'
                    className='startup-form-input'
                    required
                    placeholder='Startup Image URL'
                />
                {errors.link && <p className='startup-form-error'>{errors.link} </p>}
            </div>
            <div data-color-mode="light">
                <label htmlFor="pitch" className='startup-form-label'>
                    Pitch
                </label>
                <MDEditor
                    value={pitch}
                    onChange={(value) => setPitch(value as string)}
                    id="pitch"
                    preview='edit'
                    height={300}
                    style={{ borderRadius: 20, overflow: "hidden" }}
                    textareaProps={{
                        placeholder:
                            "Briefly describe your idea and what problem it solves",
                    }}
                    previewOptions={{
                        disallowedElements: ["style"],
                    }}
                />
                {errors.pitch && <p className='startup-form-error'>{errors.pitch} </p>}
            </div>
            <Button type='submit' className='startup-form-bttn text-white'
                disabled={isPending}>
                {isPending ? "Submitting..." : "Submit Your Pitch"}
                <Send className='size-6 ml-2' />
            </Button>
        </form>
    )
}

export default StartupForm;





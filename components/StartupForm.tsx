import React, { useActionState, useState } from 'react'
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import MDEditor from '@uiw/react-md-editor'
import { Button } from './ui/button';
import { Send } from 'lucide-react';
import { formSchema } from '@/lib/validation';

export const StartupForm = () => {

    const [errors,setErrors]=useState<Record<string,string>>({})
    const[pitch,setPitch]=useState("");

    const handleFormSubmit=async(prevState:"",formData:FormData)=>{
        try{
            const formValues={
                title:formData.get("title") as string,
                description:formData.get("description") as string,
                category:formData.get("category") as string,
                link:formData.get("link") as string,
                pitch,
            }
            await formSchema.parseAsync(formValues);

            // const result=await createIdea(prevState,formData,pitch);

        }
        catch(error){

        }finally{}
    };

    const [state,formAction,isPending]=useActionState(handleFormSubmit,
        {
            error:"",
            status:"INITIAL",
        });



  return (
    <form  action={()=>{}} className='startup-form'>
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
            onChange={(value)=>setPitch(value as string)}
            id="pitch"
            preview='edit'
            height={300}
            style={{borderRadius:20,overflow:"hidden"}}
            textareaProps={{
                placeholder:
                "Briefly describe your idea and what problem it solves",
            }}
            previewOptions={{
                disallowedElements:["style"],
            }}
            />

            {errors.pitch && <p className='startup-form-error'>{errors.pitch} </p>}

        </div>
        <Button  type='submit' className='startup-form-bttn text-white' 
        disabled={isPending}>{isPending? "Submitting...":"Submit Your Pitch"}
        <Send className='size-6 ml-2'/>
        </Button>
    </form>
  )
}

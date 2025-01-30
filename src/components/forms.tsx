import { Post } from '@/interfaces/post';
import { User } from '@/interfaces/user';
import { apiPostCreate } from '@/lib/api/posts';
import { apiUpdatePassword, apiUpdateProfile } from '@/lib/api/profile';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { DefaultButton } from './buttons';


const userInfoFormSchema = z.object({
  firstName: z.string().nonempty(),
  lastName: z.string().nonempty(),
  email: z.string().email(),
})

interface UserInfoFormProps {
  onUpdate: (user: User) => void;
}

export function UserInfoForm({
  onUpdate,
} : UserInfoFormProps) {

  const [submitting, setSubmitting] = useState(false);
  // Create a form using tailwind css
  const { register, handleSubmit, formState: { errors } } = useForm<{
    firstName: string;
    lastName: string;
    email: string;
  }>();

  const onSubmit = async (data: {
    firstName: string;
    lastName: string;
    email: string;
  }) => {
    try {
      const userInfo = userInfoFormSchema.parse(data);
      console.log(userInfo);

      setSubmitting(true);

      const updateRes = await apiUpdateProfile(userInfo);

      console.log('updateRes', updateRes);

      onUpdate(updateRes);

      setSubmitting(false);
      
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error(error.errors);
      } else {
        console.error(error);
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-50 border flex flex-col gap-4 rounded-md border-gray-200 p-4">
      <h2 className="text-lg font-semibold">Update User Info</h2>
      <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <div className="flex flex-col gap-2">
          <label htmlFor="firstName" className="text-sm font-medium">First Name</label>
          <input type="text" id="firstName" placeholder="John" {...register('firstName')} className="p-2 border border-gray-300 rounded-md" />
          {errors.firstName && <p className="text-red-500">{String(errors.firstName.message)}</p>}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="lastName" className="text-sm font-medium">Last Name</label>
          <input type="text" id="lastName" placeholder="Doe" {...register('lastName')} className="p-2 border border-gray-300 rounded-md" />
          {errors.lastName && <p className="text-red-500">{String(errors.lastName.message)}</p>}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-medium">Email</label>
          <input type="email" id="email" placeholder="john.doe@email.com" {...register('email')} className="p-2 border border-gray-300 rounded-md" />
          {errors.email && <p className="text-red-500">{String(errors.email.message)}</p>}
        </div>
      </div>
      <div className="flex justify-end">
        <DefaultButton text="Save Changes" type="submit" loading={submitting} loadingText='Saving...' />
      </div>
    </form>
  )
}

const passwordFormSchema = z.object({
  password: z.string().min(8, 'Password must be at least 8 characters long'),
  repeatPassword: z.string().min(8, 'Password must be at least 8 characters long'),
}).refine(data => data.password === data.repeatPassword, {
  message: "Passwords don't match",
  path: ['repeatPassword'],
});

interface PasswordFormProps {
  onUpdate: (data: { password: string }) => void;
}

export function PasswordForm({ onUpdate }: PasswordFormProps) {
  const [submitting, setSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<{
    password: string;
    repeatPassword: string;
  }>();

  const onSubmit = async (data: {
    password: string;
    repeatPassword: string;
  }) => {
    try {
      const passwordData = passwordFormSchema.parse(data);
      console.log(passwordData);

      setSubmitting(true);

      await apiUpdatePassword(passwordData.password);

      console.log('Password updated successfully');

      onUpdate({ password: passwordData.password });

      setSubmitting(false);
      
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error(error.errors);
      } else {
        console.error(error);
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-50 border flex flex-col gap-4 rounded-md border-gray-200 p-4">
      <h2 className="text-lg font-semibold">Change Password</h2>
      <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-sm font-medium">New Password</label>
          <input type="password" id="password" placeholder="********" {...register('password')} className="p-2 border border-gray-300 rounded-md" />
          {errors.password && <p className="text-red-500">{String(errors.password.message)}</p>}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="repeatPassword" className="text-sm font-medium">Repeat Password</label>
          <input type="password" id="repeatPassword" placeholder="********" {...register('repeatPassword')} className="p-2 border border-gray-300 rounded-md" />
          {errors.repeatPassword && <p className="text-red-500">{String(errors.repeatPassword.message)}</p>}
        </div>
      </div>
      <div className="flex justify-end">
        <DefaultButton text="Change Password" type="submit" loading={submitting} loadingText='Saving...' />
      </div>
    </form>
  )
}

// Add a create post form here that takes the title and content of the post

const postFormSchema = z.object({
  title: z.string().nonempty(),
  content: z.string().nonempty(),
})

interface PostFormProps {
  onCreate: (data: Post) => void;
}

export function PostForm({
  onCreate,
} : PostFormProps) {

  const [submitting, setSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  // Set initial values for the form

  const onSubmit = async (data: any) => {
    try {
      const postInfo = postFormSchema.parse(data);
      console.log(postInfo);

      setSubmitting(true);

      const newPost = await apiPostCreate(postInfo.title, postInfo.content);

      onCreate(newPost);

      setSubmitting(false);
      
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error(error.errors);
      } else {
        console.error(error);
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-50 border flex flex-col gap-4 rounded-md border-gray-200 p-4">
      <h2 className="text-lg font-semibold">Create Post</h2>
      <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <div className="flex flex-col gap-2">
          <label htmlFor="title" className="text-sm font-medium">Title</label>
          <input type="text" id="title" placeholder="Post Title" {...register('title')} className="p-2 border border-gray-300 rounded-md" />
          {errors.title && <p className="text-red-500">{String(errors.title.message)}</p>}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="content" className="text-sm font-medium">Content</label>
        <textarea id="content" placeholder="Post Content" {...register('content')} className="p-2 border border-gray-300 rounded-md" />
        {errors.content && <p className="text-red-500">{String(errors.content.message)}</p>}
      </div>
      <div className="flex justify-end">
        <DefaultButton text="Create Post" type="submit" loading={submitting} loadingText='Creating...' />
      </div>
    </form>
  )
}
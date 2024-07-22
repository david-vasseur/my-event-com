"use client";
import React, { useState } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

const LoginForm = () => {

    const router = useRouter();
    const [messages, setMessages] = useState('');

    const initialValues = {
        userName : "",
        password: "",
    };

    const validationSchema = Yup.object().shape({
        userName: Yup.string().required('Email obligatoire').email("L'email doit être un email valide"),
        password: Yup.string().required('Mot de passe obligatoire'),
    });

    const handleSubmit = async (values: {userName: string, password: string}) => {

        const userLogin = {
            username: values.userName,
            password: values.password
        }

        try {
            const response = await signIn('credentials', {
                redirect: false,
                username: values.userName,
                password: values.password
            });
            if (response?.error) {
                setMessages(response.error);
              } else {
                setMessages('connection reussi');
              }
        } catch (error) {
            setMessages(String(error))
        }
    };

    return (
        <div className="flex flex-col items-center justify-center mt-[10rem]">
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                <Form className="flex flex-col w-[90vw] p-[4rem] gap-5 border-2 border-blue-700 rounded-[2rem] backdrop-blur-sm shadow-custom sm:w-[70vw] md:w-[50vw] lg:w-[30vw]">
                    <label htmlFor="userName">Email</label>
                    <Field
                        name="userName"
                        className="rounded-[2rem] h-[2rem] bg-slate-400 opacity-75 p-2 text-blue-700 font-semibold outline-blue-700 shadow-custom"
                    />
                    <ErrorMessage name="userName" className="text-red-700 font-semibold" component="div" />
                    <label htmlFor="password">Mot de passe</label>
                    <Field
                        name="password"
                        className="rounded-[2rem] h-[2rem] bg-slate-400 opacity-75 p-2 text-blue-700 font-semibold outline-blue-700 shadow-custom"
                    />
                    <ErrorMessage name="password" className="text-red-700 font-semibold" component="div" />
                    <div className="flex justify-center mt-[2rem]">
                        <button type="submit" className="bg-blue-700 rounded-[2rem] p-2 w-[10rem] hover:shadow-button transition-all duration-200">Se connecter</button>
                    </div>
                    
                </Form>
            </Formik>
            <div className="flex gap-2 mt-[5rem]">
                <p>Pas encore inscrit ?</p>
                <Link className="text-blue-700 underline-1 underline-blue-700" href="/connect/sign">Cliquer ici</Link>
                <p>pour s&apos;inscrire...</p>
            </div>
            <div>
                {messages.length > 0 && (
                    <div className="absolute top-[50%] left-[50%] border-2 border-blue-700 rounded-[2rem] backdrop-blur-sm shadow-custom p-8 -translate-x-[50%] flex flex-col gap-8 items-center">
                        <h2 className="font-extrabold text-[2rem] text-white-100 text-shadow2">{messages}</h2>
                        <button className="p-4 bg-blue-700 rounded-[2rem] w-[5rem]" onClick={() => {
                            setMessages('');
                            router.push('/profile');
                            }}>Ok</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LoginForm;
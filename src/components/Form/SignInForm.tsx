"use client";
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import * as Yup from 'yup';

const SignInForm = () => {

    const router = useRouter();
    const [messages, setMessages] = useState('');

    const initialValues = {
        email: "",
        password: "",
        confirmPassword: "",
        lastName: "",
        firstName: "",
        age: 18,
        description: ""
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string().required("L'email est obligatoire").email("L'email doit être valide"),
        password: Yup.string().required("Le mot de passe est obligatoire").min(8, "Le mot de passe doit contenir au moins 8 charactère").matches(/[A-Z]/, "Le mot de passe doit commencer par une majuscule"),
        confirmPassword: Yup.string().required("Vous devez confirmer votre mot de passe").oneOf([Yup.ref('password')], "Les mots de passe doivent être identiques"),
        lastName: Yup.string().required("Votre nom est obligatoire"),
        firstName: Yup.string().required("Votre prénom est obligatoire"),
        age: Yup.number().required("Vous devez renseigner votre âge"),
        description: Yup.string()
    });

    const handleSubmit = async (values: {
        email: string;
        password: string;
        confirmPassword: string;
        lastName: string;
        firstName: string;
        age: number;
        description: string;
    }) => {

        const newUser = {
            username: values.email,
            password: values.password,
            lastname: values.lastName,
            firstname: values.firstName,
            age: Number(values.age),
            description: values.description,
            picture: null
        };

        console.log(newUser);
        

        try {
            const response = await fetch('/api/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newUser),
            })
            if (response.ok) {
                const data = await response.json();
                setMessages(data.message);                
            }
        } catch (error) {
            console.log(error);
            setMessages(String(error));  
        };
    }

    return (
        <div>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                <Form className="flex flex-col w-[90vw] p-[4rem] gap-5 border-2 border-blue-700 rounded-[2rem] backdrop-blur-sm shadow-custom sm:w-[70vw] md:w-[50vw] lg:w-[30vw]">
                    <label htmlFor="email" className="">Email</label>
                    <Field name="email" className="rounded-[2rem] h-[2rem] bg-slate-400 opacity-75 p-2 text-blue-700 font-semibold outline-blue-700 shadow-custom" />
                    <ErrorMessage name="email" className="text-red-700 font-semibold" component="div" />
                    <label htmlFor="password" className="">Mot de passe</label>
                    <Field name="password" className="rounded-[2rem] h-[2rem] bg-slate-400 opacity-75 p-2 text-blue-700 font-semibold outline-blue-700 shadow-custom" />
                    <ErrorMessage name="password" className="text-red-700 font-semibold" component="div" />
                    <label htmlFor="confirmPassword" className="">Confirmez votre mot de passe</label>
                    <Field name="confirmPassword" className="rounded-[2rem] h-[2rem] bg-slate-400 opacity-75 p-2 text-blue-700 font-semibold outline-blue-700 shadow-custom" />
                    <ErrorMessage name="confirmPassword" className="text-red-700 font-semibold" component="div" />
                    <label htmlFor="lastName" className="">Votre Nom</label>
                    <Field name="lastName" className="rounded-[2rem] h-[2rem] bg-slate-400 opacity-75 p-2 text-blue-700 font-semibold outline-blue-700 shadow-custom" />
                    <ErrorMessage name="lastName" className="text-red-700 font-semibold" component="div" />
                    <label htmlFor="firstName" className="">Votre prénom</label>
                    <Field name="firstName" className="rounded-[2rem] h-[2rem] bg-slate-400 opacity-75 p-2 text-blue-700 font-semibold outline-blue-700 shadow-custom" />
                    <ErrorMessage name="firstName" className="text-red-700 font-semibold" component="div" />
                    <label htmlFor="age" className="">Votre âge</label>
                    <Field name="age" className="rounded-[2rem] h-[2rem] bg-slate-400 opacity-75 p-2 text-blue-700 font-semibold outline-blue-700 shadow-custom" />
                    <ErrorMessage name="age" className="text-red-700 font-semibold" component="div" />
                    <label htmlFor="description" className="">Décrivez vous</label>
                    <Field as="textarea" name="description" className="rounded-[2rem] bg-slate-400 opacity-75 p-2 text-blue-700 font-semibold outline-blue-700 shadow-custom" />
                    <ErrorMessage name="description" className="text-red-700 font-semibold" component="div" />
                    <div className="flex justify-center mt-[2rem]">
                        <button type="submit" className="bg-blue-700 rounded-[2rem] p-2 w-[10rem] hover:shadow-button transition-all duration-200">S'inscrire</button>
                    </div>
                </Form>
            </Formik>
            <div>
                {messages.length > 0 && (
                    <div className="absolute top-[50%] left-[50%] border-2 border-blue-700 rounded-[2rem] backdrop-blur-sm shadow-custom p-8 -translate-x-[50%] flex flex-col gap-8 items-center">
                        <h2 className="font-extrabold text-[2rem] text-white-100 text-shadow2">{messages}</h2>
                        <button className="p-4 bg-blue-700 rounded-[2rem] w-[5rem]" onClick={() => {
                            setMessages('');
                            router.push('/connect');
                            }}>Ok</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SignInForm;
"use client"
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';

const Page =  () => {
    const { data: session, status } = useSession();
    const [user, setUser] = useState<{age: number |null, firstname: string | null, lastname: string |null, username: string, description: string | null}>();
    const [view, setView] = useState(false);

    
    const initialValues = {
        lastName: user?.lastname || "",
        firstName: user?.firstname || "",
        age: Number(user?.age),
        description: user?.description || ""
    };

    const validationSchema = Yup.object().shape({
        lastName: Yup.string().required("Votre nom est obligatoire"),
        firstName: Yup.string().required("Votre prénom est obligatoire"),
        age: Yup.number().required("Vous devez renseigner votre âge").typeError("L'âge doit être un nombre"),
        description: Yup.string()
    });

    const handleSubmit = (values: {lastName: string | null, firstName: string | null, age: number | null, description: string | null}) => {
        console.log(values);
    }

    useEffect(() => {
        if (status === 'authenticated') { 
            const getUser = async () => {
                try {
                    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Cache-Control': 'no-cache'
                        },
                        credentials: "include"
                    });

                    if (response.ok) {
                        const data = await response.json();
                        console.log(data.user);
                        setUser(data.user);
                    } else {
                        if (response.status === 401) {
                            console.log("Votre session a expiré");
                        }
                    }
                } catch (error) {
                    console.log(error);
                }
            }

            getUser();
        }
    }, [status]);

    if (status === 'loading') {
        return <div>Chargement...</div>;
    }

    if (!session || !user) {
        return (
            <div className="flex flex-col items-center justify-center mt-[5rem] gap-8">
                <h2 className="text-[2rem] font-extrabold bg-slate-700 rounded-[2rem] w-[18rem] h-[4rem]"></h2>
                <div className="flex gap-5 justify-center items-center">
                    <span className="pl-4 pr-4 p-2 bg-slate-700 rounded-[2rem] w-[8rem] h-[3rem]"></span>
                    <span className="pl-4 pr-4 p-2 bg-slate-700 rounded-[2rem] w-[8rem] h-[3rem]"></span>
                    <span className="pl-4 pr-4 p-2 bg-slate-700 rounded-[2rem] w-[8rem] h-[3rem]"></span>
                    <span className="pl-4 pr-4 p-2 bg-slate-700 rounded-[2rem] w-[8rem] h-[3rem]"></span>
                </div>
            </div>
        )
    }

     
    return (
        <div className="flex flex-col items-center justify-center mt-[5rem] gap-8">
            <div className="flex gap-12 items-end">
                <img src="https://tl.vhv.rs/dpng/s/256-2569698_clip-art-grey-profile-picture-circle-hd-png.png" alt="" className="rounded-full w-[15rem] h-[15rem]"  />
                <h2 className="text-[4rem] font-extrabold text-blue-700 text-shadow">{user.firstname} {user.lastname}</h2>
            </div>
            <span className="border-[1px] border-blue-700 w-[90%] shadow-button mt-5 mb-5"></span>
            <div className="flex items-start gap-5 justify-around w-[90%]">
                <div className="w-1/3 mr-[2rem]">
                    <h3 className="text-[2rem] font-extrabold text-blue-700 text-shadow text-center mb-9">Infos</h3>
                {user &&  
                        
                        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                        <Form className="flex flex-col w-[90vw] p-[4rem] gap-5 border-2 border-blue-700 rounded-[1rem] backdrop-blur-sm shadow-custom sm:w-[70vw] md:w-[50vw] lg:w-[30vw]">
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
                                <button type="submit" className="bg-blue-700 rounded-[2rem] p-2 w-[10rem] hover:shadow-button transition-all duration-200">Modifier</button>
                            </div>
                        </Form>
                        </Formik>
                    }
                </div>
                <span className="border-[1px] border-blue-700 h-[70vh] shadow-button mt-5 mb-5"></span>
                <div className="w-2/3 ml-[2rem]">
                    <h3 className="text-[2rem] font-extrabold text-blue-700 text-shadow text-center mb-9">Mes evenements</h3>
                    <div className="w-[90vw] p-[4rem] gap-5 border-2 border-blue-700 rounded-[1rem] backdrop-blur-sm shadow-custom sm:w-[70vw] md:w-[50vw] lg:w-[30vw]">
                        <ul>
                            <li>Mon mariage</li>
                            <li>Ma soirée avec lily</li>
                            <li>Le baptème de Jean-Baptiste</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
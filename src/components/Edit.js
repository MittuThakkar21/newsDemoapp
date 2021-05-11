import React, { useEffect } from 'react'
import { Form, Formik, useField, FieldArray, Field } from 'formik'
import * as Yup from 'yup'
import { Link, useHistory, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getNews, updateNews } from '../Actions/Action';
import moment from 'moment';

const MyTextInput = ({ label, ...rest }) => {
    const [field, meta] = useField(rest);
    return (
        <>
            <label htmlFor={rest.id || rest.label}>{label}</label>
            <input className="text-input" {...field} {...rest} />.
            {meta.touched && meta.error ? (<div style={{ color: 'red' }} className="error">{meta.error}</div>) : null}
        </>
    )
}
// const MySelect = ({ label, ...props }) => {
//     const [field, meta] = useField(props);
//     return (
//         <div>
//             <label htmlFor={props.id || props.name}>{label}</label>
//             <select {...field} {...props} />
//             {meta.touched && meta.error ? (<div style={{ color: 'red' }} className="error">{meta.error}</div>) : null}
//         </div>

//     );
// }

const Edit = ({ location }) => {
    const news = location.news
    const { id } = useParams();

    const { title, author, name, publishedAt, nid, phnumber } = news || {}

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(getNews(id))
    }, [])

    const onUpdate = (values) => {
        const updatedData = {
            id: nid,
            title: values.title,
            author: values.author,
            name: values.name,
            publishedAt: values.publishedAt,
            phnumbers: values.phnumbers
        }
        dispatch(updateNews(updatedData))

    }

    return (
        <>
            <h1>Edit News</h1>
            <Formik
                initialValues={{
                    title: title,
                    author: author,
                    name: name,
                    publishedAt: moment(publishedAt).format('YYYY-MM-DD'),
                    phnumbers: phnumber

                }}
                validationSchema={Yup.object({
                    title: Yup.string()
                        .required('Required'),
                    author: Yup.string()
                        .max(50, 'Must be 15 characters')
                        .required('Required'),
                    name: Yup.string()
                        .required('Required'),
                    publishedAt: Yup.string()
                        .required('Required'),
                    // category: Yup.string()
                    //     .oneOf(
                    //         ["Software", "It", "Politics", "other"],
                    //         "Invalid category Type"
                    //     )
                    //     .required('Required'),


                })}
                onSubmit={(values) => {
                    onUpdate(values)
                }}
            >

                <Form
                    className="col-lg-1 col-offset-6 centered">
                    <MyTextInput
                        label="Title"
                        name="title"
                        type="text"

                    /><br />

                    <MyTextInput
                        label="Author"
                        name="author"
                        type="text"
                    /><br />

                    <MyTextInput
                        label="Name"
                        name="name"
                        type="text"
                    /><br />

                    <MyTextInput
                        label="PublishedAt"
                        name="publishedAt"
                        type="date"
                    /><br /><br /><br />

                    <div className="form-control">
                        <label>List of Numbers</label>
                        <FieldArray name="phnumbers">
                            {
                                (fieldArrayProps) => {
                                    const { push, remove, form } = fieldArrayProps
                                    const { values } = form
                                    const { phnumbers } = values

                                    return <div>
                                        {
                                            phnumbers.map((phnumber, index) => (
                                                <div key={index}>
                                                    <Field name={`phnumbers.${index}`} />
                                                    {
                                                        index > 0 && (
                                                            <button type="button"
                                                                onClick={() => remove(index)}>
                                                                -
                                                            </button>

                                                        )
                                                    }

                                                    <button type="button"
                                                        onClick={() => push('')}>
                                                        +
                                                        </button>
                                                </div>
                                            ))
                                        }
                                    </div>
                                }
                            }
                        </FieldArray>
                    </div>

                    {/* <MySelect label='Category' name='category'>
                            <option value="">Select a News type</option>
                            <option value="Software">Software</option>
                            <option value="It">It</option>
                            <option value="Politics">Politics</option>
                            <option value="other">Other</option>
                        </MySelect><br /> */}

                    <button type="submit">Update</button>
                    <Link to='/' className="btn btn-primary"><button>Cancel</button></Link><br /><br />
                </Form>

            </Formik>
            <table className="table">
                {/* <thead>
                    <tr>
                        <th scope="col">Title</th>
                        <th scope="col">Description</th>
                        <th scope="col">Created_date</th>
                        <th scope="col">Publisher</th>
                        <th scope="col">Category</th>

                    </tr>
                </thead> */}
                {/* {newsdata.map((data,id) => {
                    console.log(id)
                    return (


                        <tr key={id}>
                            <td>{data.title}</td>
                            <td>{data.description}</td>
                            <td>{data.created_date}</td>
                            <td>{data.publisher}</td>
                            <td>{data.category}</td>
                            <Link to = '/edit'></Link><button>Edit</button>
                            <button>Delete</button>


                        </tr>
                    )

                })} */}
                <tbody>

                </tbody>
            </table>
        </>
    )
}



export default Edit

import React from 'react'
import { Form, Formik, useField, FieldArray, Field } from 'formik'
import * as Yup from 'yup'
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addNews } from '../Actions/Action';
import shortid from 'shortid';

const MyTextInput = ({ label, ...rest }) => {
    const [field, meta] = useField(rest);
    return (
        <>
            <label htmlFor={rest.id || rest.label}>{label}</label>
            <input className="text-input" {...field}{...rest} />
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

const Add = () => {
    // const news = useSelector(state => state.news.news)
    // console.log("news  in add component", news);
    const dispatch = useDispatch();
    const history = useHistory();

    const adddata = (values) => {

        const add = {
            id: shortid.generate(),
            title: values.title,
            author: values.author,
            name: values.name,
            publishedAt: values.publishedAt,
            phnumbers: values.phnumbers
        }
        dispatch(addNews(add))
        history.push('/')
    }
    return (
        <>
            <h1>Add News</h1>
            <Formik
                initialValues={{
                    title: '',
                    author: '',
                    name: '',
                    publishedAt: '',
                    // category: '',
                    phnumbers: ['']

                }}
                validationSchema={Yup.object({
                    title: Yup.string()
                        .max(20, 'Must be 15 characters or less')
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
                    // alert(JSON.stringify(values))
                    adddata(values)
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
                                    {/* console.log('field array props', fieldArrayProps) */ }
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
                                                            </button>)
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

                    <button type="submit">Add</button>


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

export default Add

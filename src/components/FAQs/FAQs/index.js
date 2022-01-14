import { React, useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import moment from 'moment'
import DeleteGuideModal from '../../ui/Modals/DeleteGuideModal'
import Loading from '../../Spinners/Loading'
import classes from './index.module.css'

function FAQs(props) {
    const [isLoading, setIsLoading] = useState(true)
    const [faqs, setFaqs] = useState([])

    useEffect(() => {
        setIsLoading(false)
        setFaqs(props.faqs)
    }, [props.faqs])

    function handleDeleteGuide(guideId) {
        props.onDeleteGuide(guideId)
    }

    if (isLoading) {
        return <Loading />
    }

    return (
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>FAQ Name</th>
                        <th>Game</th>
                        <th>Platforms</th>
                        <th>FAQ Type</th>
                        <th>Date Created</th>
                        <th>Date Modified</th>
                        <th>URL</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {faqs.map((faq) =>
                            <tr key={faq.id}>
                                <td>{faq.name}</td>
                                <td>{faq.game}</td>
                                <td>{faq.platforms}</td>
                                <td>{faq.type}</td>
                                <td>{moment(faq.dateCreated).format('MMMM D, YYYY')}</td>
                                <td>{moment(faq.dateModified).format('MMMM D, YYYY')}</td>
                                <td><a href={faq.url} target={'_blank'} rel="noreferrer">{faq.url}</a></td>
                                <td className={classes.actions}>
                                    {
                                        <Link to={`/guides/${faq.id}/update`}><button className={classes.edit}>Edit</button></Link>
                                    }
                                    {
                                        <DeleteGuideModal guideId={faq.id} onDeleteGuide={handleDeleteGuide} />
                                    }
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </Table>
        </div>
    )
}

export default FAQs
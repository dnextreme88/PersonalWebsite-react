import React from 'react'
import classes from './index.module.scss'

function WorkExperience() {
    const work1 = {
        companyName: 'Virtual Web Assist',
        position: 'Senior Python Backend Developer',
        tenure: 'April 10, 2018 ~ May 16, 2019',
        jobResponsibilities: [
            'Add new features that cater to the clients\' need.',
            'Develop POS systems using different payment types.',
            'Implement BitShares functionality using Python, Django and Django REST Framework.',
            'Implement the different cryptocurrencies using our own cryptocurrency named Bitpal based on Bitcoin.',
            'Maintain security of BitShares wallets in the Blockchain technology.',
        ],
    }

    const work2 = {
        companyName: 'Chatsmith Online Services',
        position: 'Chat Support Representative and Data Entry',
        tenure: 'June 17, 2019 ~ December 21, 2019',
        jobResponsibilities: [
            'As a chat support representative, assist and help in the inquiries of clients who are using the platform in PersistIQ.',
            'As a data entry specialist, process invoices by inputting line items and accurately identify its price, quantity, unit of measurement etc. of clients in the food and beverages industry using the PlateIQ platform.',
            'As a shelf cam labeler, identify out-of-stock, messy and invalid products on a grocery stall taken using a shelf camera using the Focal platform.',
        ],
        others: [
            'Office-based on June 17, 2019 ~ November 5, 2019.',
            'Home-based on November 5, 2019 ~ December 21, 2019.',
        ],
    }

    const work3 = {
        companyName: 'Visiocodex IT',
        position: 'IT Staff',
        tenure: 'February 5, 2020 ~ October 11, 2020',
        jobResponsibilities: [
            'As a Chat Support agent, answer customer inquiries related to retail loading.',
            'Monitor company hardware and troubleshoot the system when errors arise.',
            'Load up Globe SMS numbers so they have sufficient balance to provide load to retailers.'
        ],
        others: [
            'Full-time between February 5, 2020 ~ July 28, 2020.',
            'Part-time by August 2, 2020 ~ October 11, 2020.'
        ]
    }

    const work4 = {
        companyName: 'Thrive Media',
        position: 'Web Developer and Technical Writer',
        tenure: 'August 1, 2020 ~ June 15, 2021',
        jobResponsibilities: [
            'Develop websites for UCC client using PHP and Laravel.',
            'Write the software documentation of websites developed for UCC client.',
            'cPanel management and administration of client website.',
            'Redesign Homepage and Contact Us pages for AgentSupportTeam client using just HTML and CSS.',
            'Write some Glide documentation articles for revision.',
            'WordPress development: modify plugins and themes for a freelance website.'
        ],
        others: [
            'Temporarily promoted to Team Lead on October 2020.',
            'Full time between August 1, 2020 ~ November 15, 2020.',
            'Part-time by November 15, 2020 ~ June 15, 2021.'
        ]
    }

    const work5 = {
        companyName: 'eFlexervices, Inc.',
        position: 'Junior Web Developer',
        tenure: 'July 19, 2021 ~ January 29, 2022',
        jobResponsibilities: [
            'Implemented backend functionality of client Victorious\' CXP (customer experience) from the US using NodeJs and .NET Core.',
            'Learned C#, NodeJs, ReactJs during my tenure with the company.',
            'Converted the C# backend project to NodeJs code.',
            'Created a simple Software Documentation of the CXP NodeJs implementation of the original backend project built with C#.',
            'Had experience with C# during my 1st month, ReactJs on my last 3 weeks, and NodeJs in between (at least 5 months).'
        ],
    }

    const work6 = {
        companyName: 'Professional Software Solutions, Philippines',
        position: 'Junior Web Developer',
        tenure: 'January 31, 2022 ~ present',
        jobResponsibilities: [
            'Develop and maintain existing client backend using PHP 5.6 and Codeigniter 2 framework.',
        ],
    }

    const workArray = [work1, work2, work3, work4, work5, work6]

    return (
        <div>
            <div className={`text-uppercase ${classes.title}`}>Work Experience</div>
            {workArray.map((work, index) =>
                <div key={index} className={'classes.educationContainer'}>
                    <div style={{ backgroundColor: 'darkgray' }}>{work.companyName}</div>
                    <div style={{ backgroundColor: 'lightgray', textIndent: '1.5em' }}>
                        <p>{work.position}</p>
                        <p>{work.tenure}</p>
                        <p>Job Responsibilities:
                            <ol>
                            {work.jobResponsibilities.map((responsibility, index) =>
                                <li key={index}>{responsibility}</li>
                            )}
                            </ol>
                        </p>
                        <p>Others:
                        {work.others &&
                            work.others.map((other, index) =>
                                <li key={index}>{other}</li>
                            )
                        }

                        {!work.others && ' N/A'}
                        </p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default WorkExperience
import React from 'react'
import classes from './index.module.scss'

function Education() {
    const education1 = {
        companyName: 'Baguio Achievers\' Academy (Primary)',
        position: 'N/A',
        tenure: 'Grade 2B ~ 3rd Year High School (March 2008)',
        address: '#20 Sotero Laurel St., Upper General Luna Baguio City 2600',
        others: [
            'Honor student awards: Grade 4, Grade 5, 1st Year, 3rd Year.',
            'Bronze medalist awards: 2nd Year.',
        ],
    }

    const education2 = {
        companyName: 'Northridge Academy, Inc. (Secondary)',
        position: 'N/A',
        tenure: '4th Year High School',
        address: '001 Camelia Street, Upper QM, Baguio City 2600',
        others: [
            'Participated in my school\'s Love-Box Drive to help the needy in STAC-5 Loakan, Baguio City, Philippines on December 16, 2011.',
            'Hailed as batch\'s Prom King held at Hotel Supreme on February 11, 2012.',
            'Commencement Exercise (March 2012) awards: Best in Conduct Award, Expressionist Award, Servant Leader of the Year Award.',
        ],
    }

    const education3 = {
        companyName: 'University of the Cordilleras (Tertiary)',
        position: 'BS IT major in Network and Security',
        tenure: 'June 2012 ~ August 2017',
        others: [
            '2012 - 2014 tenure as a Civil Engineering student and 2014 -2017 tenure as an Information Technology student.',
            'One of the SCT Proctor volunteers for evaluation of instructors on November 17, 2016 and November 19, 2016.',
            'Volunteered for the write-up of GDG Baguio\'s 2016 event held at the University of the Cordilleras. Wrote a myriad of topics including their Codelab challenges, inspirational talks from the speakers and the freebies giveaways.',
        ]
    }

    const educationArray = [education1, education2, education3]

    return (
        <div>
            <div className={`text-uppercase ${classes.title}`}>Education</div>
            {educationArray.map((education, index) =>
                <div key={index} className={'classes.educationContainer'}>
                    <div style={{ backgroundColor: 'darkgray' }}>{education.companyName}</div>
                    <div style={{ backgroundColor: 'lightgray', textIndent: '1.5em' }}>
                        <p>{education.position}</p>
                        <p>{education.tenure}</p>
                        <p>Others:
                        {education.others &&
                            education.others.map((other, index) =>
                                <li key={index}>{other}</li>
                            )
                        }
                        </p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Education
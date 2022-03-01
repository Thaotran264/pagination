import React from 'react'
import { useCallback } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import './home.css'
const Home = () => {
    const [items, setItems] = useState([])

    const url = 'https://jsonplaceholder.typicode.com/posts'
    const fetchData = useCallback(async () => {
        const response = await fetch(url)
        const data = await response.json()
        setItems(data)
    }
    )
    // fetchData()

    useEffect(() => {
        fetchData()
    }, [])


    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(8)
    const numberPages = Math.ceil(items.length / itemsPerPage)

    const pages = [];
    for (let i = 1; i <= numberPages; i++) {
        pages.push(i)
    }

    const indexOfLastItems = currentPage * itemsPerPage
    const indexOfFirstItems = indexOfLastItems - itemsPerPage
    const currentItems = items.slice(indexOfFirstItems, indexOfLastItems)

    const [pageNumberLimit, setPageNumberLimit] = useState(5)
    const [maxPageNumber, setMaxPageNumber] = useState(5)
    const [minPageNumber, setMinPageNumber] = useState(0)

    const handleChangePage = (page) => {
        console.log(page)
        setCurrentPage(Number.parseInt(page))
    }

    const handleNext = () => {
        setCurrentPage(currentPage + 1)

        if (currentPage + 1 > maxPageNumber) {
            setMaxPageNumber(maxPageNumber + pageNumberLimit)
            setMinPageNumber(minPageNumber + pageNumberLimit)
        }
        console.log('click')
        console.log(currentPage)
        console.log(pages[0])
    }
    const handlePrev = () => {
        setCurrentPage(currentPage - 1)

        if ((currentPage - 1) % pageNumberLimit == 0) {
            setMaxPageNumber(maxPageNumber - pageNumberLimit)
            setMinPageNumber(minPageNumber - pageNumberLimit)
        }
    }
    return (
        <section className='home__container'>
            <div className='home__content'>
                <div className='title'>
                    <h2>Pagination</h2>
                    <div className='underline'></div>
                </div>

                <div className='content'>
                    <select value={itemsPerPage} onChange={(e) => setItemsPerPage(e.target.value)}>
                        <option>4</option>
                        <option>8</option>
                        <option>12</option>
                        <option>16</option>
                    </select>

                    <div className='list-items'>
                        {currentItems.map((item, index) =>
                            <article key={index} className='items'>
                                <header>{item.title.length > 50 ? `${item.title.slice(0, 50)}...` : item.title}</header>
                                <main>{item.body.length > 100 ? `${item.body.slice(0, 100)}...` : item.body}</main>
                            </article>
                        )}
                    </div>

                    <div className='pagination'>
                        <ul>
                            <li onClick={handlePrev} disabled={currentPage == pages[0] ? true : false}>Prev</li>
                            {pages.map(page => {
                                if (page < maxPageNumber + 1 && page > minPageNumber)
                                    return (

                                        <li key={page}
                                            className={currentPage === page ? 'active' : ''}
                                            onClick={() => handleChangePage(page)}>{page}</li>
                                    )
                                return null
                            }
                            )}
                            <li onClick={handleNext}
                                disabled={currentPage == pages[pages.length - 1] ? true : false}>Next</li>

                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Home
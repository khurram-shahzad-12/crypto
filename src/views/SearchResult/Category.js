import { useFilter } from "./context/filter-context"
import useCollapse from 'react-collapsed'
import { BsDash, BsPlus } from "react-icons/bs";
import { Form } from 'react-bootstrap';

export const Category = ({ data }) => {

    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse({
        defaultExpanded: true,
    });

    const { filterDispatch, category } = useFilter();

    const handleCatgeoryChange = (e, option) => {
        const check = e.target.checked
        filterDispatch({
            type: "CATEGORY",
            payload: { option, check }
        })
    }

    return (

        <>
            <div className='filter_list'>
                <div className='filter_title' {...getToggleProps()}>
                    <div>
                        {data.title}
                    </div>
                    <div >{isExpanded ? <BsDash /> : <BsPlus />}</div>
                </div>
                <div className='filter_description' {...getCollapseProps()}>
                    <div className='filter_description_list'>
                        <div className="mb-3">
                            <div className='search_box'>
                                <input type="text" className='text_Search_box' />
                            </div>
                            <ul>
                                {
                                    data.list.length > 0 && data.list.map((ele, index) => {
                                        return (
                                            <li key={index}>
                                                <Form.Check
                                                    inline
                                                    label={ele.name}
                                                    name={data.title}
                                                    id={`inline-checkbox-${ele.id}`}
                                                    value={ele.id}
                                                    onChange={(e) => handleCatgeoryChange(e, ele.id)}
                                                    checked={category.includes(ele.id)}
                                                />
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className='divider'></div> */}
        </>
    )
}
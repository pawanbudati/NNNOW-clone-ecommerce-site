const SearchBar = ({ categoryList }) => {
    return (
        <div className='search-bar  scale-in-center'>
            <i onClick={e => console.log('Search button is clicked')} className='fa fa-search'></i>
            <input list='category-list' className='dh-search-input' type='text' />
            <datalist id='category-list'>
                {categoryList.map(category => <option value={category} key={category}></option>)}
            </datalist>
        </div>
    );
}

export default SearchBar;
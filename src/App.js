/* eslint-disable react-hooks/exhaustive-deps */
import './App.css';
import Input from './components/Input';
import { GoMarkGithub } from 'react-icons/go';
import { useState } from 'react';
import ReactPaginate from 'react-paginate';

function App() {
  const [user, setUser] = useState('');
  const [users, setUsers] = useState([]);
  const [pageCount, setPageCount] = useState(1);

  
  const submit = async (e) => {
    if (e.target.value === '') {
      alert('Enter a username');
    } else {
      e.preventDefault();
      var page = 1;
      const res = await fetch(
        `https://api.github.com/search/users?q=${user}&page=${page}`
      );
      const data = await res.json();
      const response = data.items;
      const total_count = Math.ceil(data.total_count / 30)
      if (total_count > 34){
        setPageCount(34)
      } else {
        setPageCount(total_count);
      }
      setUsers(response);
      console.log(data.total_count);
    }
  };

  const handlePageClick = (data) => {
    console.log(data.selected + 1);
    const getData = async () => {
      var page = data.selected + 1;
      const res = await fetch(
        `https://api.github.com/search/users?q=${user}&page=${page}`
      );
      const dat = await res.json();
      const response = dat.items;
      setUsers(response);
    };
    getData();
  };

  return (
    <div className='App'>
      <header>
        <h1>
          <a href='google.com'>
            <GoMarkGithub className='logo' size={20} />
            <span>Github User Search</span>
          </a>
        </h1>
        <Input setUser={setUser} submit={submit} />
      </header>
      {pageCount > 1 && <ReactPaginate
        previousLabel={'<<'}
        nextLabel={'>>'}
        breakLabel={'...'}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        marginPagesDisplayed={2}
        pageRangeDisplayed={2}
        containerClassName={'pagination'}
        pageClassName={'pager'}
        pageLinkClassName={'pager-link'}
        previousClassName={'pager'}
        previousLinkClassName={'pager-link'}
        nextClassName={'pager'}
        nextLinkClassName={'pager-link'}
        breakClassName={'pager'}
        breakLinkClassName={'pager-link'}
      />}
      {users !== [] && (
        <div className='main'>
          <div className='container'>
            {users.map((profile) => {
              return (
                <section key={profile.id}>
                  <img
                    src={`${profile.avatar_url}`}
                    alt=''
                    className='profilePic'
                  />
                  <p className='username'>{profile.login}</p>
                  <div className='tentative'>
                    <span className='score'>Score: {profile.score}</span>
                    <a href={`github.com/${profile.login}`} className='link'>
                      <GoMarkGithub />
                      github.com/{profile.login}
                    </a>
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

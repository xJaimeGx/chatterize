import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_TOPICS } from '../utils/queries';
import TopicList from '../components/TopicList';
import ReplyList from '../components/ReplyList';


// function Form() {
//     const App = () => {
//       const [matches, setMatches] = useState(
//         window.matchMedia("(min-width: 768px)")
//         )

//   useEffect(() => {
//     window
//     .matchMedia("(min-width: 768px)")
//     .addEventListener('change', e => setMatches( e.matches ));
//   }, []);
// }}

const Home = () => {
  // make query request
  const { loading, data } = useQuery(QUERY_TOPICS);
  // get topic data from query response
  const topics = data?.topics || [];
    console.log(topics);
    //  Media querys
     



  return (
    <main>
      <div className='flex-row justify-space-between justify-left w-100'>
        <div className='w-30 mb-3 float-left m-auto'>
          <div className='sb-header bold'>
            <h2>Chitter chatter about stuff that matters!</h2>
          </div>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <TopicList topics={topics} title="" />
          )}
        </div>
        <div className='Stick flex-row justify-space-between'>
{/*  */}

        <div className="card-input">
      <div className="card mb-3">
        <p className="card-header">
          <span style={{ fontWeight: 700 }} className="text-light">
            {ReplyList.username}
          </span>{' '}
          topic on {ReplyList.createdAt}
        </p>
        <div className="card-body">
          <p>{ReplyList.topicText}</p>
          </div>
      </div>
      {ReplyList.replyNum > 0 && <ReplyList replies={ReplyList.replies} />}
    
    {/*  */}
    </div>
        </div>
      </div>
    </main>
  );
};

export default Home;

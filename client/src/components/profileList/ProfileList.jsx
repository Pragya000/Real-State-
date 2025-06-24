import './profileList.scss';
import Card from '../card/Card';
 

 
function ProfileList({posts}) {
   
  return (
    <div className='profileList'>
      {posts.map(item =>(
        <Card key = {item.id} item = {item}/>
      ))}
    </div>
  );
}

export default ProfileList;
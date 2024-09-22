import React from "react";

const MessageCard = ({ message }) => {

    //mock up replys
    const comments = [
        { id: 1, author: "Reply 1", content: "This is the first reply." , date: "2021-09-01"},
        { id: 2, author: "Reply 2", content: "This is the second reply." ,date: "2021-09-02"},
        { id: 3, author: "Reply 3", content: "This is the third reply." ,date: "2021-09-03"},
    ];

    function randomAvatarPath(){
        const avatarFilename =  Math.floor(Math.random() * 6) + 1 + ".png";
        const avatarPath = `${process.env.PUBLIC_URL}/comment-avatar/${avatarFilename}`;
        console.log(avatarPath);
        return avatarPath;
    }



    // display content an author
    return (
        <div>
            <div className="text-white p-4 rounded-s shadow-lg border-primary">
                <div className="message-author text-xl font-bold mb-2">{message.author}</div>
                <div className="message-date">{message.date}</div>
                <div className="text-lg p-4 text-center">{message.content}</div>

                <div className="border-t-2 border-zinc-600"></div>

                {/* comments of the message */}
                {comments.map((comment) => (
                    <div className="comment-container w-full flex flex-row py-2 justify-between">
                        <div className="comment-avatar flex items-center">
                            <img className="w-10 h-10 rounded-full" src={randomAvatarPath()} alt="comment-avatar"></img>
                        </div>
                        <div className="flex-grow pl-3">
                            <div className="comment-user-info flex flex-row justify-between">
                                <div> {comment.author}</div>
                                <div className="text-s"> {comment.date}</div>
                            </div>
                            <div className="comment-content ">
                                {comment.content}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    

}


export default MessageCard;
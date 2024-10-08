import { useState, useEffect } from "react";

export default function HerbLists(){
    const [loadStatus, setLoadStatus] = useState(true);
    const [herbData, setHerbData] = useState([]);

    useEffect(()=>{
        try {
            const fetchData = async () => {
                const herb = await fetch(
                     'http://localhost:3002/api/getHbs'
                );
                if(herb.ok){
                    const hbJson = await herb.json();
                    setHerbData(hbJson);
                }else{
                    alert('[ERR] Unable to read data.');
                }
            }
            fetchData().catch(console.error);
            setLoadStatus(false);
            console.log('Fetch herb data.');
        } catch (error) {
            alert('[ERR] An error occurs when reading the data.');
        }
    }, [loadStatus]);

    const handleDelete = (hbId) => {
        try {
            const fetchData = async() => {
                const hbData = await fetch(
                    `http:///api/deleteHbs/${hbId}`,
                    { 
                        method: 'DELETE'
                    }
                );
                if(hbData.ok){
                    const myJson = await hbData.json();
                    alert(myJson.message);
                }else{
                    alert('[ERR] An error when deleting data.');
                }
            } 
            fetchData();
            setLoadStatus(true);
        } catch (error) {
            alert('[ERR] An error occurs when deleting the data.');
        }
    }
    
    return (
    <div className="m-3">
        <a href='herbForm'>[ เพิ่มข้อมูลสมุนไพร ]</a>
        <h1 className="font-bold">รายการสมุนไพร</h1>
        {
            herbData.map((h_item, index) => 
            <div key={index}>
                <div className="font-bold p-2 m-2 border-2 rounded-lg">
                    ชื่อสมุนไพร: {'hbName'}<br/>
                    รายละเอียด: {'hbDesc'}<br/>
                    หมวดหมู่: {'hbCate'}<br/>
                    สรรพคุณ: {'hbProp'}<br/>
                    ผู้ผลิต: {'hbSupp'}<br/>
                </div>
                <div className="p-2 m-2">
                    <a href={`/lab02/herbDetail/${h_item.hbId}`}>[ รายละเอียด ]</a>
                    <a href={`/lab02/herbEditFrom/${h_item.hbId}`}>[ แก้ไข ]</a>
                    <a href="#" onClick={(e) => handleDelete(`${h_item.hbId}`)}>[ ลบ ]</a>
                </div>
            </div>
            )
        }
    </div>
    );
}
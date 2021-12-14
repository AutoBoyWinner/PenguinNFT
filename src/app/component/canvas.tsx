import React, {FunctionComponent, useRef, useEffect, useState} from 'react';
import { loadImage } from 'canvas';

import { Penguin } from "../core/models/penguin";
import ClockLoader from "react-spinners/ClockLoader";

const image_path = 'basic_images';

export interface CanvasProps {
    penguin: Penguin | undefined;
    className: string;
}

export const Canvas: FunctionComponent<CanvasProps> = ({ penguin, className }) => {

    const canvasRef = useRef(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
       drawPenguinImage(penguin).then();
    },[penguin]);

    const drawPenguinImage = async (penguin: Penguin | undefined) => {
        if(penguin) {
            const keys = ['background', 'skin', 'eye', 'mouth', 'cloth', 'glass', 'hair', 'hat', 'neck', 'random_object'];
            setIsLoading(true);
            const images = [];
            for (let i = 0; i < keys.length; i++) {
                const key = keys[i];
                // @ts-ignore
                if (penguin[key].length > 0) {
                    let path = '';
                    if(key === 'glass' || key === 'cloth') {
                        path = `./${image_path}/${key}es/${penguin[key]}.png`
                    } else {
                        // @ts-ignore
                        path = `./${image_path}/${key}s/${penguin[key]}.png`
                    }
                    const image = await loadImage(path);
                    images.push(image);
                }
            }
            setIsLoading(false);
            const canvas: any = canvasRef.current;
            if(canvas) {
                const ctx = canvas.getContext('2d');
                for(let i = 0 ; i < images.length ; i++) {
                    const image = images[i];
                    ctx.drawImage(image, 0, 0);
                }
            }
        }
    }

    return (
        <div >
            {
                isLoading ? (
                    <div className="d-flex w-100 h-100 justify-content-center">
                        <ClockLoader size={ 70 } color='white' />
                    </div>
                ) : (
                    <canvas ref={canvasRef} className={className} width="512" height="512"/>
                )
            }
        </div>
    )
}
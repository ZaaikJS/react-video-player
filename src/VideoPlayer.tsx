import React, { useRef, useState, useEffect, useCallback } from "react";
import "../style.css";

interface VideoPlayerProps {
    src?: string;
    autoPlay?: boolean;
    muted?: boolean;
    width?: number;
    height?: number;
    settings?: boolean;
}

// --- ICONS ---

const PlayIcon = React.memo(() => (
    <svg viewBox="0 0 330 330">
        <path d="M37.728,328.12c2.266,1.256,4.77,1.88,7.272,1.88c2.763,0,5.522-0.763,7.95-2.28l240-149.999 c4.386-2.741,7.05-7.548,7.05-12.72c0-5.172-2.664-9.979-7.05-12.72L52.95,2.28c-4.625-2.891-10.453-3.043-15.222-0.4 C32.959,4.524,30,9.547,30,15v300C30,320.453,32.959,325.476,37.728,328.12z" fill="white" />
    </svg>
));

const PauseIcon = React.memo(() => (
    <svg viewBox="0 0 24 24">
        <path d="M19,4V20a2,2,0,0,1-2,2H15a2,2,0,0,1-2-2V4a2,2,0,0,1,2-2h2A2,2,0,0,1,19,4ZM9,2H7A2,2,0,0,0,5,4V20a2,2,0,0,0,2,2H9a2,2,0,0,0,2-2V4A2,2,0,0,0,9,2Z" fill="white" />
    </svg>
));

const VolumeIcon = React.memo(() => (
    <svg viewBox="0 0 100 100">
        <g>
            <path d="M78.864,17.021c-0.026-0.026-0.056-0.042-0.082-0.067l0.008-0.008l-1.924-1.923l-0.022,0.022 c-1.05-0.836-2.567-0.788-3.553,0.161l-0.004-0.004l-3.419,3.418l0.023,0.023c-0.773,0.983-0.77,2.365,0.01,3.345l-0.022,0.022 l0.216,0.216h0l1.707,1.708l0.031-0.031c0.025,0.026,0.042,0.057,0.067,0.083 c14.358,14.358,14.401,37.688,0.138,52.104l-0.019-0.019l-1.707,1.707h0l-0.216,0.216l0.022,0.022 c-0.836,1.05-0.787,2.568,0.16,3.553l-0.004,0.004l3.42,3.42l0.023-0.023c0.983,0.773,2.365,0.769,3.345-0.011l0.022,0.022 l0.216-0.216h0l0,0l1.707-1.707l-0.004-0.004C97.105,64.797,97.061,35.219,78.864,17.021z" fill="white" />
            <path d="M69.376,30.198c-0.026-0.026-0.056-0.042-0.082-0.067l0.008-0.008L67.377,28.2l-0.022,0.022 c-1.05-0.836-2.568-0.787-3.554,0.16l-0.004-0.004l-0.035,0.035l-3.149,3.148l-0.225,0.225l0.023,0.023 c-0.773,0.984-0.769,2.365,0.011,3.344l-0.022,0.022l1.923,1.924l0.031-0.031 c0.025,0.026,0.042,0.057,0.067,0.083c7.091,7.091,7.132,18.594,0.135,25.746l-0.014-0.014L60.825,64.6l-0.001,0 l-0.215,0.215l0.022,0.022c-0.836,1.05-0.788,2.569,0.16,3.554l-0.004,0.004l3.42,3.42l0.023-0.023 c0.983,0.773,2.364,0.769,3.344-0.011l0.022,0.022l1.923-1.923l-0.004-0.004C80.352,58.886,80.308,41.131,69.376,30.198z" fill="white" />
            <path d="M52.751,23.803c-0.378,0-0.727,0.108-1.031,0.285l-0.018-0.032L31.238,35.871v0.012l-7.74,4.469H9.016v0.04 c-0.012,0-0.024-0.004-0.037-0.004c-0.842,0-1.525,0.684-1.525,1.525v20.66c0,0.842,0.683,1.524,1.525,1.524 c0.013,0,0.024-0.003,0.037-0.004v0.041h14.482l11.524,6.653v-0.031l16.548,9.555c0.336,0.232,0.742,0.372,1.181,0.372 c1.143,0,2.071-0.927,2.071-2.07c0-0.081-0.015-0.155-0.024-0.233h0.024V25.64h-0.024C54.681,24.609,53.815,23.803,52.751,23.803z" fill="white" />
        </g>
    </svg>
));

const SettingsIcon = React.memo(() => (
    <svg viewBox="0 0 24 24">
        <path d="M9.387 17.548l.371 1.482c.133.533.692.97 1.242.97h1c.55 0 1.109-.437 1.242-.97l.371-1.482 c.133-.533.675-.846 1.203-.694l1.467.42c.529.151 1.188-.114 1.462-.591l.5-.867c.274-.477.177-1.179-.219-1.562 l-1.098-1.061c-.396-.383-.396-1.008.001-1.39l1.096-1.061c.396-.382.494-1.084.22-1.561l-.501-.867 c-.275-.477-.933-.742-1.461-.591l-1.467.42c-.529.151-1.07-.161-1.204-.694l-.37-1.48c-.133-.532-.692-.969-1.242-.969h-1 c-.55 0-1.109.437-1.242.97l-.37 1.48c-.134.533-.675.846-1.204.695l-1.467-.42c-.529-.152-1.188.114-1.462.59 l-.5.867c-.274.477-.177 1.179.22 1.562l1.096 1.059c.395.383.395 1.008 0 1.391l-1.098 1.061 c-.395.383-.494 1.085-.219 1.562l.501.867c.274.477.933.742 1.462.591l1.467-.42c.528-.153 1.07.16 1.203.693zm2.113-7.048 c1.104 0 2 .895 2 2 0 1.104-.896 2-2 2s-2-.896-2-2c0-1.105.896-2 2-2z" fill="white" />
    </svg>
));

const SpeedIcon = React.memo(() => (
    <svg viewBox="0 0 20 20">
        <path d="M10,20C4.5,20,0,15.5,0,10S4.5,0,10,0s10,4.5,10,10S15.5,20,10,20z M10,2c-4.4,0-8,3.6-8,8s3.6,8,8,8s8-3.6,8-8S14.4,2,10,2 z" fill="white" />
        <path d="M8.6,11.4c-0.8-0.8-2.8-5.7-2.8-5.7s4.9,2,5.7,2.8c0.8,0.8,0.8,2,0,2.8C10.6,12.2,9.4,12.2,8.6,11.4z" fill="white" />
    </svg>
));

const LeftArrowIcon = React.memo(() => (
    <svg viewBox="0 0 24 24">
        <path id="primary" d="M21,11H5.41l5.3-5.29A1,1,0,1,0,9.29,4.29l-7,7a1,1,0,0,0,0,1.42l7,7a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42L5.41,13H21a1,1,0,0,0,0-2Z" fill="white" />
    </svg>
));

export default function Video({
                                        src,
                                        autoPlay = false,
                                        muted = autoPlay,
                                        width,
                                        height,
                                        settings = true
                                    }: VideoPlayerProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const volumeRef = useRef<HTMLDivElement>(null);

    const controlsTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const [progress, setProgress] = useState(0);
    const [volume, setVolume] = useState(0.5);
    const [isMuted, setIsMuted] = useState(muted);
    const [playbackRate, setPlaybackRate] = useState(1);
    const [isPlaying, setIsPlaying] = useState(autoPlay);

    // UI STATES
    const [isSeeking, setIsSeeking] = useState(false);
    const [isVolumeDragging, setIsVolumeDragging] = useState(false);

    const [volumeVisible, setVolumeVisible] = useState(false);
    const [settingsVisible, setSettingsVisible] = useState(false);
    const [controls, setControls] = useState(false);
    const [isHoveringControls, setIsHoveringControls] = useState(false);
    const [settingsOption, setSettingsOption] = useState('none');
    const [containerSize, setContainerSize] = useState({width: 600, height: 300});
    const effectiveIsMuted = volume === 0 || isMuted;

    // VOLUME
    const updateVolumeFromEvent = useCallback((clientY: number) => {
        if (!volumeRef.current || !videoRef.current) return;
        const rect = volumeRef.current.getBoundingClientRect();
        const newVolume = 1 - (clientY - rect.top) / rect.height;
        const clampedVolume = Math.max(0, Math.min(1, newVolume));

        setVolume(clampedVolume);
        videoRef.current.volume = clampedVolume;

        if (clampedVolume > 0) {
            setIsMuted(false);
            videoRef.current.muted = false;
        }
    }, []);

    // SEEK BAR
    const updateSeekFromEvent = useCallback((clientX: number) => {
        const bar = progressRef.current;
        if (!bar || !videoRef.current) return;

        const rect = bar.getBoundingClientRect();
        let moveX = clientX - rect.left;
        moveX = Math.max(0, Math.min(moveX, rect.width));

        const percentage = moveX / rect.width;
        videoRef.current.currentTime = percentage * videoRef.current.duration;
        setProgress(percentage * 100);
    }, []);

    // VOLUME DRAGGING
    useEffect(() => {
        if (!isVolumeDragging) return;

        const handleMouseMove = (e: MouseEvent) => {
            updateVolumeFromEvent(e.clientY);
        };

        const handleMouseUp = () => {
            setIsVolumeDragging(false);
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [isVolumeDragging, updateVolumeFromEvent]);

    // SEEK BAR DRAGGING
    useEffect(() => {
        if (!isSeeking) return;

        const handleMouseMove = (e: MouseEvent) => {
            updateSeekFromEvent(e.clientX);
        };

        const handleMouseUp = () => {
            setIsSeeking(false);
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [isSeeking, updateSeekFromEvent]);


    // --- OTHER EFFECT ---

    useEffect(() => {
        if(videoRef.current){
            videoRef.current.playbackRate = playbackRate;
        }
    }, [playbackRate]);

    useEffect(() => {
        const containerEl = containerRef.current;
        if (containerEl) {
            const rect = containerEl.getBoundingClientRect();
            setContainerSize(prev => {
                const newSize = {
                    width: rect.width || 600,
                    height: rect.height || 300
                };
                if (prev.width !== newSize.width || prev.height !== newSize.height) {
                    return newSize;
                }
                return prev;
            });
        }
    }, []);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.muted = isMuted;
        }
    }, [isMuted]);

    // SEEK BAR UPDATE
    useEffect(() => {
        const videoEl = videoRef.current;
        if (!videoEl) return;

        const handleTimeUpdate = () => {
            if (!isSeeking) {
                setProgress((videoEl.currentTime / videoEl.duration) * 100);
            }
        };

        videoEl.addEventListener("timeupdate", handleTimeUpdate);
        return () => videoEl.removeEventListener("timeupdate", handleTimeUpdate);
    }, [isSeeking]);

    useEffect(() => {
        const videoEl = videoRef.current;
        if (!videoEl) return;

        if (isPlaying) {
            videoEl.play().catch(() => {});
        } else {
            videoEl.pause();
        }
    }, [isPlaying]);

    // CONTROLS
    useEffect(() => {
        if (!controls) return;

        if (controlsTimeoutRef.current) {
            clearTimeout(controlsTimeoutRef.current);
        }

        controlsTimeoutRef.current = setTimeout(() => {
            if (!isHoveringControls) {
                setControls(false);
                setSettingsVisible(false);
                setTimeout(() => {
                    setSettingsOption('none');
                }, 1000);
            }
        }, 2000);

        return () => {
            if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
        };
    }, [controls, isHoveringControls]);

    // MUTE SYNC
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsMuted(prev => (volume === 0 ? true : prev));
        }, 0);

        return () => clearTimeout(timer);
    }, [volume]);

    // --- UI HANDLERS ---

    const togglePlayPause = useCallback(() => setIsPlaying(prev => !prev), []);

    const toggleMute = useCallback(() => {
        setIsMuted(prevIsMuted => {
            const nextIsMuted = !prevIsMuted;
            if (videoRef.current) {
                videoRef.current.muted = nextIsMuted;
            }
            if (nextIsMuted) {
                setVolume(0);
            } else {
                setVolume(prevVol => prevVol === 0 ? 0.5 : prevVol);
            }
            return nextIsMuted;
        });
    }, []);

    const handleVolumeClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        updateVolumeFromEvent(e.clientY);
    }, [updateVolumeFromEvent]);

    const handleVolumeMouseDown = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        updateVolumeFromEvent(e.clientY);
        setIsVolumeDragging(true);
    }, [updateVolumeFromEvent]);

    const handleSeekMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        updateSeekFromEvent(e.clientX);
        setIsSeeking(true);
    }, [updateSeekFromEvent]);

    const handleContainerMouseMove = useCallback(() => {
        setControls(true);
    }, []);

    const toggleSettings = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        setSettingsVisible(v => !v);
    }, []);

    const showSpeedSettings = useCallback(() => setSettingsOption('speed'), []);
    const hideSpeedSettings = useCallback(() => setSettingsOption('none'), []);

    return (
        <div
            ref={containerRef}
            className="video-container"
            onMouseMove={handleContainerMouseMove}
            style={{width: width || containerSize.width, height: height || containerSize.height}}
        >
            <video
                ref={videoRef}
                className="video"
                src={src}
                autoPlay={autoPlay}
                muted={muted}
                style={{width: "100%", height: "100%"}}
                onClick={togglePlayPause}
            />

            <div
                className={`controls ${controls ? 'visible' : 'invisible'}`}
                onMouseEnter={() => setIsHoveringControls(true)}
                onMouseLeave={() => setIsHoveringControls(false)}
            >
                <div className="leftButtons">
                    <div className={`button ${isPlaying ? "pause" : "play"}`} onClick={togglePlayPause}>
                        {isPlaying ? <PauseIcon/> : <PlayIcon/>}
                    </div>
                    <div
                        className="button volume"
                        onMouseEnter={() => setVolumeVisible(true)}
                        onMouseLeave={() => setVolumeVisible(false)}
                    >
                        <div className={`volume-container ${volumeVisible ? 'visible' : 'invisible'}`}>
                            <div
                                className="volume-bar"
                                ref={volumeRef}
                                onMouseDown={handleVolumeMouseDown}
                                onClick={handleVolumeClick}
                            >
                                <div className="volume-level" style={{height: `${volume * 100}%`}}/>
                            </div>
                        </div>

                        <div className="volume-icon-wrapper" onClick={toggleMute}>
                            <VolumeIcon/>
                            {effectiveIsMuted && <span className="mute-x"/>}
                        </div>
                    </div>
                </div>

                <div className="seekBarContainer">
                    <div className="seekBar" ref={progressRef} onMouseDown={handleSeekMouseDown}>
                        <div className="progress" style={{width: `${progress}%`}}></div>
                    </div>
                </div>

                {settings && (
                    <div className="button settings">
                        <div
                            className="settings-icon-wrapper"
                            onClick={toggleSettings}
                        >
                            <SettingsIcon />
                        </div>
                    </div>
                )}

            </div>
            <div
                className={`settings-container ${settingsVisible ? 'visible' : 'invisible'}`}
                onMouseEnter={() => setIsHoveringControls(true)}
                onMouseLeave={() => setIsHoveringControls(false)}
            >
                <div>
                    {settingsOption === 'none' && (
                        <>
                            <center style={{ padding: '0 10px 10px 10px', fontSize: '12px' }}>Settings</center>
                            <div className={"divider"} />
                            <div className={`settings-option`} onClick={showSpeedSettings}>
                                <SpeedIcon/> Speed
                            </div>
                        </>
                    )}
                    {settingsOption === 'speed' && (
                        <div style={{ width: '120px' }}>
                            <div
                                className={"settings-option"}
                                style={{ padding: '0 10px 10px 10px', fontSize: '12px' }}
                                onClick={hideSpeedSettings}
                            >
                                <LeftArrowIcon/> Back
                            </div>
                            <div className={"divider"} style={{ marginBottom: '10px' }} />
                            <div className={"speed-list"}>
                                {[0.5, 1, 1.5, 2].map((rate) => (
                                    <div
                                        key={rate}
                                        onClick={() => setPlaybackRate(rate)}
                                        className={playbackRate === rate ? "active" : ""}
                                    >
                                        {rate.toFixed(1)}x
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
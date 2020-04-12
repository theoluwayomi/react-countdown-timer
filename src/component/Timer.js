import React, { Component} from 'react';
import Play from './Play.js'
import SpeedControl from './SpeedControl.js';
import TimerInput from './TimerInput.js';
import sound from '../sound/sound_bite.mp3';
import UIFx from 'uifx';

const SPEED = {normal: 1.0, fast: 0.75, faster: 0.5}
const beep = new UIFx({asset: sound})
beep.setVolume(1)

class Timer extends Component {
    constructor() {
        super()
        this.state = {
            show: true,
            blinker: null,
            interval: null,
            elapsed: 0,
            total: 0,
            isOn: false,
            timeUp: false,
            factor: SPEED.normal,
            over: false,
            started: false,
        }

    }

    start = () => {
        if (!this.state.started) return
        if(!this.state.isOn && !this.state.timeUp) {
            var int = setInterval(() => {
                
                this.setState(() => {
                    return {elapsed: this.state.elapsed + 1}
                })
                this.checks()
            }, (1000 * this.state.factor));
            this.setState({interval: int, isOn: true})
        } else if (this.state.isOn && !this.state.timeUp) {
            clearInterval(this.state.interval)
            this.setState({interval: null, isOn: false})
        }
    }

    format = () => {
        var offset = this.state.total - this.state.elapsed
        var m = Math.floor(offset/60)
        var s = Math.floor(offset%60)
        return {min: this.pad(m), sec: this.pad(s)}
    }

    pad = (val) => {
        return ('0'+val).slice(-2)
    }

    checks = () => {
        if ((Math.floor(this.state.total) - Math.floor(this.state.elapsed) === Math.floor(this.state.elapsed))) {
            this.setState({message: "More than half way there!"})
        }
        if ((Math.floor(this.state.elapsed) === Math.floor(this.state.total))) {
            beep.play()
            clearInterval(this.state.interval)
            clearInterval(this.state.blinker)
            this.setState({timeUp: true, interval: null, blinker: null, isOn: false, message: "Times Up!"})
        }
        if ((Math.floor(this.state.total) - Math.floor(this.state.elapsed) === 20)) {
            this.setState({over: true})
        }
        
        if (((Math.floor(this.state.total) - Math.floor(this.state.elapsed) <= 10) && !this.state.timeUp)) {
            clearInterval(this.state.interval)
            this.setState((state)=> {return {interval: null}}, () => {
                var int = setInterval(() => {
                
                    this.setState(() => {
                        return {elapsed: this.state.elapsed + 1}
                    }, () => {
                        setTimeout(() => {
                            this.setState((state) => {return {show : !state.show}})
                        }, (1000 * this.state.factor) * 0.1)
                    })
                    
                    this.checks()
                }, (1000 * this.state.factor));
                this.setState({interval: int})
            })
            
        }
    }

    speedUp = (factor) => {
        if (this.state.isOn) {
            this.setState(() => {
                clearInterval(this.state.interval)
                return {
                    factor: factor, 
                    isOn: false,
                    interval: null
                }
            }, () => {
                this.start()
            })
        }
    }

    init = (seconds) => {
        clearInterval(this.state.interval)
        this.setState({total: seconds, elapsed: 0, interval: null, isOn: false, started: true, timeUp: false, over: false}, () => {
            this.start()
        })
    }

    render() {
        return (
            <div className="bg-g1 flex-w flex-col-c-sb p-l-15 p-r-15 p-t-55 p-b-35 respon1">
                <h5 className="s1-txt2">Countdown</h5>
                <br />
                <TimerInput start={this.init} />
                <div className="flex-w flex-c cd100 p-b-0 m-t-30 borderLine">
                    <div className="flex-col-c-m size-full how-countdown" >
                        <h5 className="mes">{this.state.message}</h5>
                        <span className={`l1-txt3 p-b-9 minutes ${this.state.over?'red':''}`}>{this.state.show ? this.format().min + " : " +this.format().sec : ''}</span>
                    </div>
                </div>
                <Play pauseplay={this.start} icon={this.state.isOn ? 'fa fa-pause' : 'fa fa-play'} />
                <SpeedControl speedUp={this.speedUp} icon={'fa fa-fast-forward'} active={this.state.factor} />
            </div>
        );
    }
}

export default Timer;

const StateMachine = require('javascript-state-machine');

module.exports = class MonsterStateMachine {
    constructor(owner) {
        this.owner = owner;

        this.fsm = new StateMachine({
            init: 'idle',
            transitions: [
                { name: 'spawn', from: 'idle', to: 'moving' },
                { name: 'hit', from: 'moving', to: 'hitting' },
                { name: 'die', from: ['moving', 'hitting'], to: 'dead' },
            ],
            methods: {
                // Log for test lifecycle
                onBeforeHit: () => {
                    cc.log('\n\n[FSM] onBeforeHit');
                    cc.log('Current state:', this.fsm.state);
                },
                onLeaveMoving: () => {
                    cc.log('\n\n[FSM] onLeaveMoving');
                    cc.log('Current state:', this.fsm.state);
                },
                onEnterHit: () => {
                    cc.log('\n\n[FSM] onEnterHit');
                    cc.log('Current state:', this.fsm.state);
                },
                onAfterHit: () => {
                    cc.log('\n\n[FSM] onAfterHit');
                    cc.log('Current state:', this.fsm.state);
                },
                onBeforeDie: () => {
                    cc.log('\n\n[FSM] onBeforeDie');
                    cc.log('Current state:', this.fsm.state);

                },
                onLeaveHit: () => {
                    cc.log('\n\n[FSM] onLeaveHit');
                    cc.log('Current state:', this.fsm.state);
                },
                onSpawn: () => this.owner.handleSpawn(),
                onHit: () => this.owner.handleHit(),
                onDie: () => this.owner.handleDie(),
            }
        });
    }

    get state() {
        return this.fsm.state;
    }

    transition(name) {
        if (this.fsm.can(name)) {
            this.fsm[name]();
        }
    }

    can(name) {
        return this.fsm.can(name);
    }
};

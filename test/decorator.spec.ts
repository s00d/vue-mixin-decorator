import test from 'ava';
import Vue from 'vue';
import {mount} from '@vue/test-utils';
import {spy} from 'sinon';

import { Component, Mixin, Mixins } from '../src';

test('@Component decorator test', t => {
	// Arrange
	const created = spy();
	const destroyed = spy();

	@Component
	class MyComp extends Vue {
		created() {
			created();
		}

		destroyed() {
			destroyed();
		}
	}

	// Act
	const wrapper = mount(MyComp);
	const destroyedBefore = destroyed.notCalled;
	wrapper.destroy();
	const destroyedAfter = destroyed.calledOnce;

	// Assert
	t.true(wrapper.isVueInstance());
	t.true(created.calledOnce);
	t.true(destroyedBefore);
	t.true(destroyedAfter);
});

test('@Mixin decorator test', t => {
	// Arrange
	@Mixin
	class MyMixin extends Vue {}

	// Act
	const wrapper = mount(MyMixin);

	// Assert
	t.true(wrapper.isVueInstance());
});

test('Single Mixins test', t => {
	// Arrange
	const mixinOneCreated = spy();
	const mixinOneCalledFromComponent = spy();

	@Mixin
	class MyMixinOne extends Vue {
		created() {
			mixinOneCreated();
		}

		mixinOneMethod() {
			mixinOneCalledFromComponent();
		}
	}

	@Component
	class MyComponent extends Mixins<MyMixinOne>(MyMixinOne) {
		created() {
			this.mixinOneMethod();
		}
	}

	// Act
	const wrapper = mount<MyComponent>(MyComponent);

	// Assert
	t.true(wrapper.isVueInstance());
	t.true(mixinOneCreated.calledOnce);
	t.true(mixinOneCalledFromComponent.calledOnce);
});

test('Multiple Mixins test', t => {
	// Arrange
	const mixinOneCreated = spy();
	const mixinTwoCreated = spy();
	const mixinOneCalledFromComponent = spy();
	const mixinTwoCalledFromComponent = spy();

	@Mixin
	class MyMixinOne extends Vue {
		created () {
			mixinOneCreated();
		}

		mixinOneMethod () {
			mixinOneCalledFromComponent();
		}
	}

	@Mixin
	class MyMixinTwo extends Vue {
		created() {
			mixinTwoCreated();
		}

		mixinTwoMethod() {
			mixinTwoCalledFromComponent();
		}
	}

	/*
		To handle multiple mixins (complete with Typescript completion)
		an interface needs to be created extending your mixins.
	 */
	interface IMixinInterface extends MyMixinOne, MyMixinTwo {}

	/*
		Provide `Mixins` with the interface
	 */
	@Component
	class MyComponent extends Mixins<IMixinInterface>(MyMixinOne, MyMixinTwo) {
		created () {
			this.mixinOneMethod();
			this.mixinTwoMethod();
		}
	}

	// Act
	const wrapper = mount<MyComponent>(MyComponent);

	// Assert
	t.true(wrapper.isVueInstance());
	t.true(mixinOneCreated.calledOnce);
	t.true(mixinTwoCreated.calledOnce);
	t.true(mixinOneCalledFromComponent.calledOnce);
	t.true(mixinTwoCalledFromComponent.calledOnce);
});
const sampleMixin = require("../mixins/saample.mixin")

module.exports = {
	name: "Something",
    mixins : [sampleMixin],
	actions: {
		thisDoesSomething: {
			handler(ctx) {
                console.log(sampleMixin)
                this.something(1);
				console.log("Something");
			},
		},
	},
};

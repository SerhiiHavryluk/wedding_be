import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true
	},
	secondName: {
		type: String,
	},
	willAttend: Boolean,
	unableToAttend: Boolean,
	willRespondLater: Boolean,
	willChampagne: Boolean,
	willWhiteWine: Boolean,
	willRedWine: Boolean,
	willCognac: Boolean,
	willGorilka: Boolean,
	willВіski: Boolean,
	willNonAlcoholicDrinks: Boolean,
},
{
	timestamps: true
}
);

export default mongoose.model('User', UserSchema, 'users'); 
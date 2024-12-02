import FS from 'fs/promises';
import path from 'path';

async function get_lists(input_file: 'sample' | 'input') {
	const input = await FS.readFile(path.join(__dirname, input_file), 'utf-8');

	const input_array = input.split('\n').map(function (line) {
		return line
			.trim()
			.split(' ')
			.filter((val) => val)
			.map((val) => parseInt(val));
	});

	const list_1 = input_array.map((lists) => lists[0]).sort(),
		list_2 = input_array.map((lists) => lists[1]).sort();

	return {
		list_1,
		list_2,
	};
}

async function part_1(input_file: 'sample' | 'input') {
	const { list_1, list_2 } = await get_lists(input_file);

	return list_1.reduce(function (acc, curr, idx) {
		const distance = Math.abs(curr - list_2[idx]);
		return acc + distance;
	}, 0);
}

async function part_2(input_file: 'sample' | 'input') {
	const { list_1, list_2 } = await get_lists(input_file);

	return list_1.reduce(function (acc, curr) {
		const similarity_score = curr * list_2.filter((el) => el === curr).length;
		return acc + similarity_score;
	}, 0);
}

import FS from 'fs/promises';
import path from 'path';

async function get_lists(input_file: InputType) {
	const input = await FS.readFile(path.join(__dirname, input_file), 'utf-8');

	return input.split('\n').map(function (line) {
		return line
			.trim()
			.split(' ')
			.filter((val) => val)
			.map((val) => parseInt(val));
	});
}

function is_safe(cur: number[]) {
	const is_inc = cur[0] < cur[1];

	for (let i = 0; i < cur.length - 1; i++) {
		const el_1 = cur[i],
			el_2 = cur[i + 1];

		if (el_1 === el_2) {
			return false;
		}

		const distance = is_inc ? el_2 - el_1 : el_1 - el_2;

		if (distance < 0 || distance > 3) {
			return false;
		}
	}

	return true;
}

async function part_1(input_file: InputType) {
	const input = await get_lists(input_file);

	return input.reduce(function (acc, cur) {
		if (!cur.length) return acc;

		return is_safe(cur) ? acc + 1 : acc;
	}, 0);
}

async function part_2(input_file: InputType) {
	const input = await get_lists(input_file);

	return input.reduce(function (acc, cur) {
		if (!cur.length) return acc;

		if (is_safe(cur)) {
			return acc + 1;
		}

		for (let i = 0; i < cur.length; i++) {
			if (is_safe(cur.filter((_, idx) => idx != i))) {
				return acc + 1;
			}
		}

		return acc;
	}, 0);
}

part_2('input').then(console.log);

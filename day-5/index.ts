import FS from 'fs/promises';
import path from 'path';

async function get_lists(input_file: InputType) {
	const input = await FS.readFile(path.join(__dirname, input_file), 'utf-8');

	const [rule_set, print_orders] = input.split('\n\n').map((s) => s.trim());

	return {
		rule_set: rule_set.split('\n').map((line) => line.split('|').map((num) => parseInt(num))),
		print_orders: print_orders.split('\n').map((line) => line.split(',').map((num) => parseInt(num))),
	};
}

async function part_1(input_file: InputType) {
	const { print_orders, rule_set } = await get_lists(input_file);

	const valid_print_orders = print_orders.filter(function (row) {
		const set = new Set<number>();

		for (const n of row) {
			const relevant_rule_sets = rule_set.filter((rule) => rule[0] === n);

			for (const rule of relevant_rule_sets) {
				if (set.has(rule[1])) {
					return false;
				}
			}

			set.add(n);
		}

		return true;
	});

	return valid_print_orders.reduce((acc, print_order) => acc + print_order[Math.floor(print_order.length / 2)], 0);
}

async function part_2(input_file: InputType) {
	const { print_orders, rule_set } = await get_lists(input_file);

	const invalid_print_orders = print_orders.filter(function (row) {
		const set = new Set<number>();

		for (const n of row) {
			const relevant_rule_sets = rule_set.filter((rule) => rule[0] === n);

			for (const rule of relevant_rule_sets) {
				if (set.has(rule[1])) {
					return true;
				}
			}

			set.add(n);
		}

		return false;
	});

	const fixed_print_orders = invalid_print_orders.map(function (print_order) {
		return print_order.sort(function (a, b) {
			const relevant_rule_set = rule_set.find((rule) => rule.includes(a) && rule.includes(b));

			if (!relevant_rule_set) return 0;

			if (relevant_rule_set[0] === a) {
				return -1;
			}

			return 1;
		});
	});

	return fixed_print_orders.reduce((acc, print_order) => acc + print_order[Math.floor(print_order.length / 2)], 0);
}
